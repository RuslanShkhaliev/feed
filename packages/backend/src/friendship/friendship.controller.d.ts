import { FriendshipService } from './friendship.service';
import { PublicUser } from '../../../shared/src/models';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    followUser(req: any, targetUserId: string): Promise<PublicUser>;
    unfollowUser(req: any, targetUserId: string): Promise<PublicUser>;
}
