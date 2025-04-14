import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users';
import { JWT_REFRESH_SECRET, JWT_SECRET, SALT_ROUNDS } from './constants';
import bcrypt from 'bcrypt';
import {
    AuthCredentials,
    AuthResponse,
    RefreshTokenResponse,
    User,
    UserSchema,
} from '@feed/shared/models';

export interface AuthResponseWithRefreshToken extends AuthResponse {
    refreshToken: string;
}
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    public async register(authCredentials: AuthCredentials): Promise<AuthResponseWithRefreshToken> {
        const hash = await bcrypt.hash(authCredentials.password, SALT_ROUNDS);

        const user = await this.usersService.createUser(authCredentials.email, hash);

        return this.generateAuthTokens(user);
    }
    public async login(email: string): Promise<AuthResponseWithRefreshToken> {
        const user = await this.usersService.findByEmail(email);
        // TODO validate password

        return this.generateAuthTokens(UserSchema.parse(user));
    }
    public async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }

        try {
            const { sub: userId } = this.jwtService.verify<{ sub: number }>(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            // Проверка существования пользователя
            const user = await this.usersService.findById(userId);

            return this.signAccessToken(user);
        } catch (_error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
    public async validateUserById(id: number): Promise<User> {
        return this.usersService.findById(id);
    }
    public async validateUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.usersService.findByEmail(email);

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }

            return UserSchema.parse(user);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Invalid credentials');
            }
            throw error;
        }
    }
    private generateAuthTokens(user: User): AuthResponseWithRefreshToken {
        return {
            user,
            accessToken: this.signAccessToken(user),
            refreshToken: this.signRefreshToken(user),
        };
    }

    private signAccessToken({ id, email }: User): string {
        return this.jwtService.sign({ sub: id, email }, { secret: JWT_SECRET, expiresIn: '7d' });
    }

    private signRefreshToken({ id, email }: User): string {
        return this.jwtService.sign(
            { sub: id, email },
            { secret: JWT_REFRESH_SECRET, expiresIn: '7d' },
        );
    }
}
