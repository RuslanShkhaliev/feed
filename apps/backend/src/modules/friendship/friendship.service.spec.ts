import { createMockUser, createModuleWithPrisma, PrismaServiceMock } from '@test/factories';
import { FriendshipService } from '@/modules/friendship/friendship.service';
import { ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('FriendshipService', () => {
    let prisma: PrismaServiceMock;
    let service: FriendshipService;

    beforeEach(async () => {
        const { module, prismaServiceMock } = await createModuleWithPrisma({
            providers: [FriendshipService],
        });

        prisma = prismaServiceMock;
        service = module.get(FriendshipService);
    });

    const user1 = createMockUser();
    const user2 = createMockUser();

    describe('followUser', () => {
        it('should throw if trying to follow self', async () => {
            await expect(service.followUser(1, 1)).rejects.toThrow(ConflictException);
        });

        it('should follow user and return public user', async () => {
            prisma.friendship.findFirst.mockResolvedValueOnce({}).mockResolvedValueOnce({
                subscriberId: user1.id,
                followingId: user2.id,
            });

            prisma.friendship.create
                .mockResolvedValueOnce({ following: user2 })
                .mockResolvedValueOnce({ following: user1 });

            const user2Following = await service.followUser(user1.id, user2.id);
            const user1Following = await service.followUser(user2.id, user1.id);

            expect(user2Following).toEqual(
                expect.objectContaining({
                    id: user2.id,
                    isSubscriber: false,
                    isFollowing: true,
                }),
            );
            expect(user1Following).toEqual(
                expect.objectContaining({
                    id: user1.id,
                    isSubscriber: true,
                    isFollowing: true,
                }),
            );
        });

        it('should throw if trying to follow user', async () => {
            prisma.friendship.create.mockRejectedValue(
                new PrismaClientKnownRequestError('Unique constraint', {
                    code: 'P2002',
                    clientVersion: '4.0.0',
                }),
            );

            await expect(service.followUser(1, 2)).rejects.toThrow(ConflictException);
        });
    });

    describe('unfollowUser', () => {
        it('should unfollow user', async () => {
            prisma.friendship.delete.mockResolvedValue({ following: user2 });
            prisma.friendship.findFirst.mockResolvedValueOnce({});
        });

        it('should throw if trying to unfollow user', async () => {
            prisma.friendship.delete.mockRejectedValue(new Error());

            await expect(service.unfollowUser(1, 2)).rejects.toThrow();
        });
    });
});
