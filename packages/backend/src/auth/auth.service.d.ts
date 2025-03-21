import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users';
import { AuthCredentials, AuthResponse, RefreshTokenResponse, User } from '../../../shared/src/models';
export interface AuthResponseWithRefreshToken extends AuthResponse {
    refreshToken: string;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(authCredentials: AuthCredentials): Promise<AuthResponseWithRefreshToken>;
    login(email: string): Promise<AuthResponseWithRefreshToken>;
    refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;
    validateUserById(id: number): Promise<User>;
    validateUser(email: string, password: string): Promise<User>;
    private generateAuthTokens;
    private signAccessToken;
    private signRefreshToken;
}
