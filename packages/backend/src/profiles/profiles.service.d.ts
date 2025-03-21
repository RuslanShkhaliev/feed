import { PrismaService } from '@/prisma.service';
import { PublicUser } from '../../../shared/src/models';
export declare class ProfilesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getMutualFriends(id: number): Promise<PublicUser[]>;
    getRecommended(id: number): Promise<PublicUser[]>;
    getSubscribers(id: number): Promise<PublicUser[]>;
    getFollowings(id: number): Promise<PublicUser[]>;
    getProfileById(userId: number, profileId: number): Promise<PublicUser>;
}
