import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { PrismaService } from '@/prisma.service';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [FriendshipService, PrismaService],
  controllers: [FriendshipController],
})
export class FriendshipModule {}
