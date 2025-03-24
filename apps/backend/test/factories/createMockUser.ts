import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const createMockUser = (overrides?: Partial<User>) => {
    return {
        id: faker.number.int(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        ...overrides,
    };
};
