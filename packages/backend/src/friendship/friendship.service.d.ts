import { PrismaService } from '@/prisma.service';
import { PublicUser } from '../../../shared/src/models';
export declare class FriendshipService {
    private prismaService;
    constructor(prismaService: PrismaService);
    followUser(userId: number, targetUserId: number): Promise<PublicUser>;
    unfollowUser(userId: number, targetUserId: number): Promise<PublicUser>;
    private checkSubscribe;
}
