import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { createPublicUser, USER_SELECT } from '@/modules/users';
import { PublicUser, UserSchema } from '@feed/shared/models';

@Injectable()
export class ProfilesService {
    constructor(private prismaService: PrismaService) {}
    public async getMutualFriends(id: number): Promise<PublicUser[]> {
        return this.prismaService.user
            .findMany({
                where: {
                    AND: [
                        {
                            following: { some: { subscriberId: id } }, // Я подписан на них
                        },
                        {
                            subscribers: { some: { followingId: id } }, // они подписаны на меня
                        },
                    ],
                },
                select: USER_SELECT,
            })
            .then((users) => users.map((user) => createPublicUser(user, true, true)));
    }
    public async getRecommended(id: number): Promise<PublicUser[]> {
        return this.prismaService.user
            .findMany({
                where: {
                    AND: [
                        { subscribers: { none: { followingId: id } } },
                        { following: { none: { subscriberId: id } } },
                        { id: { not: id } },
                    ],
                },
                select: USER_SELECT,
            })
            .then((users) => users.map((user) => createPublicUser(user, false, false)));
    }
    public async getSubscribers(id: number): Promise<PublicUser[]> {
        return this.prismaService.user
            .findMany({
                where: {
                    AND: [
                        { subscribers: { some: { followingId: id } } },
                        { following: { none: { subscriberId: id } } },
                    ],
                },
                select: USER_SELECT,
            })
            .then((users) => users.map((user) => createPublicUser(user, true, false)));
    }
    public async getFollowings(id: number): Promise<PublicUser[]> {
        return this.prismaService.user
            .findMany({
                where: {
                    AND: [
                        { subscribers: { none: { followingId: id } } },
                        { following: { some: { subscriberId: id } } },
                    ],
                },
                select: USER_SELECT,
            })
            .then((users) => users.map((user) => createPublicUser(user, false, true)));
    }

    public async getProfileById(userId: number, profileId: number): Promise<PublicUser> {
        const user = await this.prismaService.user.findUnique({
            where: { id: profileId },
            select: {
                ...USER_SELECT,
                subscribers: {
                    where: { subscriberId: userId },
                    select: { id: true },
                },
                following: {
                    where: { followingId: userId },
                    select: { id: true },
                },
            },
        });
        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }
        const isSubscriber = user.subscribers?.length > 0;
        const isFollowing = user.following?.length > 0;

        return createPublicUser(UserSchema.parse(user), isSubscriber, isFollowing);
    }
}
