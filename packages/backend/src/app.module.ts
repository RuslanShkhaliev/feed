import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '@/modules/posts/posts.module';
import { ProfilesModule } from '@/modules/profiles/profiles.module';
import { PrismaService } from './prisma.service';
import { JwtAuthGuard } from '@/common/guards';
import { APP_GUARD } from '@nestjs/core';
import { FriendshipModule } from '@/friendship/friendship.module';

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
