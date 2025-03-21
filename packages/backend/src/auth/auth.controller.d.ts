import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentials, type AuthResponse, RefreshTokenResponse } from '../../../shared/src/models';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(data: AuthCredentials, res: Response): Promise<AuthResponse>;
    login({ email }: AuthCredentials, res: Response): Promise<AuthResponse>;
    refreshToken(req: Request): Promise<RefreshTokenResponse>;
    logout(res: Response): Response<any, Record<string, any>>;
}
