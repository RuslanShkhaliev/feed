import { PrismaService } from '@/prisma.service';
import { CreatedPost, FeedPost, Post } from '../../../shared/src/models';
export declare class PostsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createPost(authorId: number, dto: CreatedPost): Promise<Post>;
    getAll(authorId: number): Promise<Post[]>;
    removePost(id: number, authorId: number): Promise<Post>;
    getFeed(id: number): Promise<FeedPost[]>;
}
