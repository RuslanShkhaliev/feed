import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { UsersModule } from '@/modules/users';
import { PrismaModule } from '@/modules/prisma';

@Module({
    imports: [UsersModule, PrismaModule],
    providers: [FriendshipService],
    controllers: [FriendshipController],
})
export class FriendshipModule {}
