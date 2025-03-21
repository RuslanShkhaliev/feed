import { Controller, Delete, Param, Post, Req } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { API_ROUTES } from '@feed/shared/api';
import { PublicUser } from '@feed/shared/models';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post(API_ROUTES.FRIENDSHIP.ID)
  async followUser(
    @Req() req,
    @Param('id') targetUserId: string,
  ): Promise<PublicUser> {
    return this.friendshipService.followUser(
      req.user?.id,
      Number(targetUserId),
    );
  }

  @Delete(API_ROUTES.FRIENDSHIP.ID)
  public async unfollowUser(
    @Req() req,
    @Param('id') targetUserId: string,
  ): Promise<PublicUser> {
    return this.friendshipService.unfollowUser(
      req.user?.id,
      Number(targetUserId),
    );
  }
}
