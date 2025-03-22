import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth';
import { UsersModule } from '@/modules/users';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '@/modules/posts';
import { ProfilesModule } from '@/modules/profiles';
import { PrismaService } from './prisma.service';
import { JwtAuthGuard } from '@/common/guards';
import { APP_GUARD } from '@nestjs/core';
import { FriendshipModule } from '@/modules/friendship';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UsersModule,
        PostsModule,
        ProfilesModule,
        FriendshipModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [PrismaService],
})
export class AppModule {}
