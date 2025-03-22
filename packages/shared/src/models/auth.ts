import { z } from 'zod';
import { type User } from './user';

export const AuthCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, 'Пароль должен быть минимум 3 символа'),
});

export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;

export interface AuthResponse {
    user: User;
    accessToken: string;
}
export type RefreshTokenResponse = string;
