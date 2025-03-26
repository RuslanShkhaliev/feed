import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Public } from '@/common/decorators';
import { LocalAuthGuard } from '@/common/guards';
import { API_ROUTES } from '@feed/shared/api';
import { ZodValidationPipe } from '@/common/validation';
import {
    type AuthCredentials,
    AuthCredentialsSchema,
    type AuthResponse,
    RefreshTokenResponse,
} from '@feed/shared/models';
import { COOKIE_OPTIONS, REFRESH_KEY } from '@/modules/auth';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post(API_ROUTES.AUTH.REGISTER)
    @UsePipes(new ZodValidationPipe(AuthCredentialsSchema))
    public async register(
        @Body() data: AuthCredentials,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponse> {
        const { refreshToken, accessToken, user } = await this.authService.register(data);
        res.cookie(REFRESH_KEY, refreshToken, COOKIE_OPTIONS);
        return {
            accessToken,
            user,
        };
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post(API_ROUTES.AUTH.LOGIN)
    public async login(
        @Body() { email }: AuthCredentials,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthResponse> {
        const { user, accessToken, refreshToken } = await this.authService.login(email);

        res.cookie(REFRESH_KEY, refreshToken, COOKIE_OPTIONS);

        return {
            user,
            accessToken,
        };
    }

    @HttpCode(HttpStatus.OK)
    @Post(API_ROUTES.AUTH.REFRESH)
    public async refreshToken(@Req() req: Request): Promise<RefreshTokenResponse> {
        const { refreshToken } = req.cookies;

        return this.authService.refreshToken(refreshToken as string);
    }

    @HttpCode(HttpStatus.OK)
    @Get(API_ROUTES.AUTH.LOGOUT)
    public logout(@Res() res: Response) {
        res.clearCookie(REFRESH_KEY, COOKIE_OPTIONS);

        return res.json({ message: 'Logged out successfully' });
    }
}
