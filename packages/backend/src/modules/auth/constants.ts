import * as process from 'node:process';
import { CookieOptions } from 'express';

export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-key';
export const SALT_ROUNDS = 10;
export const REFRESH_KEY = 'refreshToken';
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
} as const satisfies CookieOptions;
