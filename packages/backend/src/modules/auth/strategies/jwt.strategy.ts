import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_SECRET } from '../constants';
import { User } from '@feed/shared/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET,
        });
    }

    async validate({ sub }: { email: string; sub: number }): Promise<User> {
        const user = await this.authService.validateUserById(sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user as User;
    }
}
