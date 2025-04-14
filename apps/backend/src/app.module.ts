import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth';
import { UsersModule } from '@/modules/users';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '@/modules/posts';
import { ProfilesModule } from '@/modules/profiles';
import { PrismaService } from './modules/prisma/prisma.service';
import { JwtAuthGuard } from '@/common/guards';
import { APP_GUARD } from '@nestjs/core';
import { FriendshipModule } from '@/modules/friendship';
import { EmailModule } from '@/modules/email';
import { PrismaModule } from '@/modules/prisma';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        AuthModule,
        UsersModule,
        PostsModule,
        ProfilesModule,
        FriendshipModule,
        EmailModule,
        PrismaModule,
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
