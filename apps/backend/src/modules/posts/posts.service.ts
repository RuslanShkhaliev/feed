import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CreatedPost, FeedPost, Post } from '@feed/shared/models';
import { PUBLIC_USER_SELECT } from '@/modules/users';
import { createPost } from '@/modules/posts/factory';

@Injectable()
export class PostsService {
    constructor(private prismaService: PrismaService) {}
    public async createPost(authorId: number, dto: CreatedPost): Promise<Post> {
        const post = await this.prismaService.post.create({
            data: {
                ...dto,
                authorId,
            },
        });

        return createPost(post);
    }

    public async getAll(authorId: number): Promise<Post[]> {
        return this.prismaService.post.findMany({
            where: { authorId },
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        });
    }

    public async removePost(id: number, authorId: number): Promise<Post> {
        return this.prismaService.post.delete({ where: { id, authorId } });
    }

    public async getFeed(userId: number): Promise<FeedPost[]> {
        return this.prismaService.post.findMany({
            where: {
                author: {
                    following: { some: { subscriberId: userId } },
                },
                published: { not: { equals: false } },
            },
            include: {
                author: {
                    select: PUBLIC_USER_SELECT,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
