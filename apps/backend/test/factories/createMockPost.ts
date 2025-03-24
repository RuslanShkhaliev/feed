import { faker } from '@faker-js/faker';
import { Post } from '@prisma/client';

export const createMockPost = (overrides?: Partial<Post>) => ({
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
