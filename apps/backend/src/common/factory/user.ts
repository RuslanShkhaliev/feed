import { User as UserModel } from '@prisma/client';
import { PublicUser, User, UserSchema } from '@feed/shared/models';

export const createUser = (user: UserModel): User => {
    return UserSchema.parse(user);
};
export const createPublicUser = (
    user: User,
    isSubscriber = false,
    isFollowing = false,
): PublicUser => ({
    ...user,
    isSubscriber,
    isFollowing,
});
