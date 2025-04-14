import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '@/modules/prisma';

@Module({
    imports: [PrismaModule],
    providers: [PostsService],
    controllers: [PostsController],
})
export class PostsModule {}
