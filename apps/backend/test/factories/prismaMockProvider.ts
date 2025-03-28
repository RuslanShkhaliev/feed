import { PrismaService } from '../../src/prisma.service';

export const createPrismaServiceMock = () => {
    const prismaServiceMock = {
        user: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
        },
        post: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
        },
        friendship: {
            create: jest.fn(),
            findFirst: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            delete: jest.fn(),
        },
    };
    return {
        prismaServiceMock,
        provider: {
            provide: PrismaService,
            useValue: prismaServiceMock,
        },
    };
};

export type PrismaServiceMock = ReturnType<typeof createPrismaServiceMock>['prismaServiceMock'];
