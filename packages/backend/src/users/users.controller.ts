import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@feed/shared/models';
import { API_ROUTES } from '@feed/shared/api';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(API_ROUTES.USERS.ME)
  public async getUserProfile(@Req() req): Promise<User> {
    return this.usersService.findById(req.user.id);
  }
}
