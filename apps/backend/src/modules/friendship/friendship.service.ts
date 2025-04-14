import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PublicUser } from '@feed/shared/models';
import { createPublicUser } from '@/common/factory';
import { PUBLIC_USER_SELECT } from '@/modules/users';

@Injectable()
export class FriendshipService {
    constructor(private prismaService: PrismaService) {}

    public async followUser(subscriberId: number, followingId: number): Promise<PublicUser> {
        if (subscriberId === followingId) {
            throw new ConflictException('Нельзя подписаться на самого себя');
        }

        try {
            const { following } = await this.prismaService.friendship.create({
                data: { subscriberId, followingId },
                include: {
                    following: {
                        select: PUBLIC_USER_SELECT,
                    },
                },
            });

            const isSubscriber = await this.checkSubscribe(followingId, subscriberId);

            return createPublicUser(following, isSubscriber, true);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Вы уже подписаны на этого пользователя');
            }
            throw error;
        }
    }

    public async unfollowUser(subscriberId: number, followingId: number): Promise<PublicUser> {
        try {
            const { following } = await this.prismaService.friendship.delete({
                where: {
                    subscriberId_followingId: {
                        subscriberId,
                        followingId,
                    },
                },
                include: {
                    following: {
                        select: PUBLIC_USER_SELECT,
                    },
                },
            });

            const isSubscriber = await this.checkSubscribe(followingId, subscriberId);

            return createPublicUser(following, isSubscriber, false);
        } catch (error) {
            throw new NotFoundException('Вы не подписаны на пользователя');
        }
    }

    private async checkSubscribe(subscriberId: number, followingId: number): Promise<boolean> {
        const friendShip = await this.prismaService.friendship.findFirst({
            where: {
                subscriberId,
                followingId,
            },
        });

        return friendShip?.subscriberId === subscriberId && friendShip.followingId === followingId;
    }
}
