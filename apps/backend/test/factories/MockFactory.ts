import { Post, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PublicUser } from '@feed/shared/models';

export class FactoryEntityMock {
    public static createPost = (overrides?: Partial<Post>) => ({
        id: faker.number.int(),
        authorId: faker.number.int(),
        published: true,
        likes: faker.number.int(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        content: faker.lorem.paragraph(),
        images: faker.helpers.arrayElements([]),
        ...overrides,
    });

    public static createUser = (overrides?: Partial<User>) => {
        return {
            id: faker.number.int(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.person.firstName(),
            createdAt: faker.date.recent(),
            ...overrides,
        };
    };

    public static createPublicUser = (overrides?: Partial<PublicUser>): PublicUser => {
        return {
            ...FactoryEntityMock.createUser(),
            isSubscriber: false,
            isFollowing: false,
            ...overrides,
        };
    };
}
