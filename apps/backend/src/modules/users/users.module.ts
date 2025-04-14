import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '@/modules/users/users.controller';
import { PrismaModule } from '@/modules/prisma';

@Module({
    imports: [PrismaModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
