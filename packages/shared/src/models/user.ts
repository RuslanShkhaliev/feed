import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number().int(),
    email: z.string().email(),
    name: z.string(),
    createdAt: z.date(),
    activated: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;
export interface PublicUser extends User {
    isSubscriber: boolean;
    isFollowing: boolean;
}
