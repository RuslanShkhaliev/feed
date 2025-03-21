import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    email: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    email: string;
    name: string;
}, {
    id: number;
    email: string;
    name: string;
}>;
export type User = z.infer<typeof UserSchema>;
export interface PublicUser extends User {
    isSubscriber: boolean;
    isFollowing: boolean;
}
