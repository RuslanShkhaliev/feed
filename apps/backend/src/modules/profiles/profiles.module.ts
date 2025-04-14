import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { UsersModule } from '@/modules/users/users.module';
import { PrismaModule } from '@/modules/prisma';

@Module({
    imports: [UsersModule, PrismaModule],
    providers: [ProfilesService],
    controllers: [ProfilesController],
})
export class ProfilesModule {}
