import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { API_ROUTES } from '@feed/shared/api';
import { PublicUser } from '@feed/shared/models';

enum ProfilesQueryType {
  All = 'all',
  Recommended = 'recommended',
  Subscribers = 'subscribers',
  Following = 'following',
}
@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @HttpCode(HttpStatus.OK)
  @Get(API_ROUTES.PROFILES.ALL)
  public async getProfiles(
    @Req() req,
    @Query('section') query: ProfilesQueryType,
  ): Promise<PublicUser[]> {
    if (!query) {
      throw new BadRequestException('Section is required');
    }

    switch (query) {
      case ProfilesQueryType.All:
        return this.profilesService.getMutualFriends(req.user.id);
      case ProfilesQueryType.Recommended:
        return this.profilesService.getRecommended(req.user.id);
      case ProfilesQueryType.Subscribers:
        return this.profilesService.getSubscribers(req.user.id);
      case ProfilesQueryType.Following:
        return this.profilesService.getFollowings(req.user.id);
      default:
        throw new BadRequestException('Invalid section value');
    }
  }

  @Get(API_ROUTES.PROFILES.ID)
  public async getProfileById(
    @Param('id') profileId: string,
    @Req() req,
  ): Promise<PublicUser> {
    return this.profilesService.getProfileById(req.user.id, Number(profileId));
  }
}
