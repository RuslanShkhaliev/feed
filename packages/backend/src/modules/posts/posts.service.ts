import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreatedPost, FeedPost, Post, PostSchema } from '@feed/shared/models';
import { USER_SELECT } from '@/modules/users';

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

        return PostSchema.parse(post);
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

    public async getFeed(id: number): Promise<FeedPost[]> {
        return this.prismaService.post.findMany({
            where: {
                author: {
                    following: { some: { subscriberId: id } },
                },
                published: { not: { equals: false } },
            },
            include: {
                author: {
                    select: USER_SELECT,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
