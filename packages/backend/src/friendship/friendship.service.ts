import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { createPublicUser } from '@/users/createPublicUser';
import { USER_SELECT } from '@/users/user.select';
import { PublicUser } from '@feed/shared/models';

@Injectable()
export class FriendshipService {
  constructor(private prismaService: PrismaService) {}
  public async followUser(
    userId: number,
    targetUserId: number,
  ): Promise<PublicUser> {
    if (userId === targetUserId) {
      throw new BadRequestException('Нельзя подписаться на самого себя');
    }

    try {
      const { following } = await this.prismaService.friendship.create({
        data: { subscriberId: userId, followingId: targetUserId },
        include: {
          following: {
            select: USER_SELECT,
          },
        },
      });

      const isSubscriber = await this.checkSubscribe(targetUserId, userId);

      return createPublicUser(following, isSubscriber, true);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Вы уже подписаны на этого пользователя');
      }
      throw error;
    }
  }

  public async unfollowUser(
    userId: number,
    targetUserId: number,
  ): Promise<PublicUser> {
    try {
      const { following } = await this.prismaService.friendship.delete({
        where: {
          subscriberId_followingId: {
            subscriberId: userId,
            followingId: targetUserId,
          },
        },
        include: {
          following: {
            select: USER_SELECT,
          },
        },
      });

      const isSubscriber = await this.checkSubscribe(targetUserId, userId);

      return createPublicUser(following, isSubscriber, false);
    } catch (error) {
      throw new NotFoundException('Вы не подписаны на пользователя');
    }
  }

  private async checkSubscribe(
    subscriberId: number,
    followingId: number,
  ): Promise<boolean> {
    const friendShip = await this.prismaService.friendship.findFirst({
      where: {
        subscriberId,
        followingId,
      },
    });

    return !!friendShip;
  }
}
