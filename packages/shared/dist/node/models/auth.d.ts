import { z } from 'zod';
import { type User } from './user';
export declare const AuthCredentialsSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;
export interface AuthResponse {
    user: User;
    accessToken: string;
}
export type RefreshTokenResponse = string;
