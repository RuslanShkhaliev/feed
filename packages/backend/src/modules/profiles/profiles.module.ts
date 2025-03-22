import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { PrismaService } from '@/prisma.service';
import { UsersModule } from '@/modules/users/users.module';

@Module({
    imports: [UsersModule],
    providers: [ProfilesService, PrismaService],
    controllers: [ProfilesController],
})
export class ProfilesModule {}
