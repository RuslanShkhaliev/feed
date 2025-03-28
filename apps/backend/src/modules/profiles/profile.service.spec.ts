import { ProfilesService } from '@/modules/profiles/profiles.service';
import { createModuleWithPrisma, FactoryEntityMock, PrismaServiceMock } from '@test/factories';
import { UserSchema } from '@feed/shared/models';
import { NotFoundException } from '@nestjs/common';

describe('ProfilesService', () => {
    let service: ProfilesService;
    let prisma: PrismaServiceMock;

    beforeEach(async () => {
        const { module, prismaServiceMock } = await createModuleWithPrisma({
            providers: [ProfilesService],
        });

        prisma = prismaServiceMock;
        service = module.get(ProfilesService);
    });

    const user1 = FactoryEntityMock.createUser({
        id: 1,
    });
    const user2 = FactoryEntityMock.createUser({
        id: 2,
    });
    const user3 = FactoryEntityMock.createUser({
        id: 3,
    });

    const mockUser = UserSchema.parse(FactoryEntityMock.createUser());
    describe('getProfileById', () => {
        it('should return profile with correct flags', async () => {
            prisma.user.findUnique.mockResolvedValue({
                ...user1,
                subscribers: [{ id: user1.id }],
                following: [],
            });

            const profile = await service.getProfileById(user2.id, user1.id);

            expect(profile).toEqual(
                expect.objectContaining({
                    id: user1.id,
                    isSubscriber: true,
                    isFollowing: false,
                }),
            );
        });

        it('should throw NotFoundException if user does not exist', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(service.getProfileById(2, mockUser.id)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getMutualFriends', () => {
        it('should return friends', async () => {
            prisma.user.findMany.mockResolvedValue([user1, user2]);

            const friends = await service.getMutualFriends(1);

            expect(friends).toHaveLength(2);
            expect(friends).toEqual([
                expect.objectContaining({
                    id: user1.id,
                    isSubscriber: true,
                    isFollowing: true,
                }),
                expect.objectContaining({
                    id: user2.id,
                    isSubscriber: true,
                    isFollowing: true,
                }),
            ]);
        });
    });
    describe('getRecommended', () => {
        it('should return recommended', async () => {
            prisma.user.findMany.mockResolvedValue([user2, user3]);

            const recommended = await service.getRecommended(1);

            expect(recommended).toHaveLength(2);
            expect(recommended).toEqual([
                expect.objectContaining({
                    id: user2.id,
                    isSubscriber: false,
                    isFollowing: false,
                }),
                expect.objectContaining({
                    id: user3.id,
                    isSubscriber: false,
                    isFollowing: false,
                }),
            ]);
        });
    });
    describe('getFollowings', () => {
        it('should return followings', async () => {
            prisma.user.findMany.mockResolvedValueOnce([user3]);

            const followings = await service.getFollowings(user1.id);

            expect(followings).toHaveLength(1);
            expect(followings).toEqual([
                expect.objectContaining({
                    id: user3.id,
                    isSubscriber: false,
                    isFollowing: true,
                }),
            ]);
        });
    });
    describe('getSubscribers', () => {
        it('should return subscribers', async () => {
            prisma.user.findMany.mockResolvedValueOnce([user1]);

            const subscribers = await service.getSubscribers(user2.id);

            expect(subscribers).toHaveLength(1);
            expect(subscribers).toEqual([
                expect.objectContaining({
                    id: user1.id,
                    isSubscriber: true,
                    isFollowing: false,
                }),
            ]);
        });
    });
});
