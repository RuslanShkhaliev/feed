import { PostsService } from '@/modules/posts/posts.service';
import { createModuleWithPrisma, FactoryEntityMock, PrismaServiceMock } from '@test/factories';
import { Post } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('PostsService', () => {
    let prisma: PrismaServiceMock;
    let service: PostsService;

    beforeEach(async () => {
        const { module, prismaServiceMock } = await createModuleWithPrisma({
            providers: [PostsService],
        });

        prisma = prismaServiceMock;
        service = module.get(PostsService);
    });

    describe('createPost', () => {
        const mockPost = FactoryEntityMock.createPost();

        it('should create a post successful', async () => {
            prisma.post.create.mockResolvedValueOnce(mockPost);

            const post = await service.createPost(mockPost.authorId, {
                content: mockPost.content,
                images: mockPost.images,
            });

            expect(post).toEqual(mockPost);
            expect(prisma.post.create).toHaveBeenCalled();
        });
    });
    describe('getAll', () => {
        const authorId = 1;
        const mockPosts: Post[] = Array.from({ length: 3 }, () =>
            FactoryEntityMock.createPost({ authorId }),
        );

        it('should return the posts successfully', async () => {
            prisma.post.findMany.mockResolvedValueOnce(mockPosts);

            const posts = await service.getAll(authorId);

            expect(posts).toEqual(mockPosts);
            expect(prisma.post.findMany).toHaveBeenCalled();
        });
    });
    describe('removePost', () => {
        const mockPost = FactoryEntityMock.createPost();

        it('should delete a post successfully', async () => {
            prisma.post.delete.mockResolvedValueOnce(mockPost);

            const post = await service.removePost(mockPost.id, mockPost.authorId);

            expect(post).toEqual(mockPost);
            expect(prisma.post.delete).toHaveBeenCalled();
        });

        it('should throw an error if post does not exist', async () => {
            prisma.post.delete.mockRejectedValueOnce(NotFoundException);

            await expect(service.removePost(1, 1)).rejects.toThrow();
        });
    });
    describe('getFeed', () => {
        const mockUser = FactoryEntityMock.createUser();
        const mockPost = FactoryEntityMock.createPost({ authorId: mockUser.id });

        const mockFeed = [
            {
                ...mockPost,
                author: mockUser,
            },
        ];

        it('should return feed for user', async () => {
            prisma.post.findMany.mockResolvedValueOnce(mockFeed);

            const feed = await service.getFeed(mockUser.id);

            expect(feed).toEqual(mockFeed);
            expect(prisma.post.findMany).toHaveBeenCalled();
        });
    });
});
