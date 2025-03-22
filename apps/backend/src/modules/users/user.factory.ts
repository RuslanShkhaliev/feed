import { PublicUser, User } from '@feed/shared/models';

export const createPublicUser = (
    user: User,
    isSubscriber: boolean,
    isFollowing: boolean,
): PublicUser => ({
    ...user,
    isSubscriber,
    isFollowing,
});
