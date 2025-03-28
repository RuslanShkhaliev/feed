import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModuleOptions } from '@nestjs/testing';
import { createPrismaServiceMock } from './prismaMockProvider';

export const createModuleWithPrisma = async (
    metadata: ModuleMetadata = {},
    options?: TestingModuleOptions,
) => {
    const { prismaServiceMock, provider: PrismaServiceProvider } = createPrismaServiceMock();

    const module = await Test.createTestingModule({
        ...metadata,
        providers: [PrismaServiceProvider, ...(metadata?.providers || [])],
    }).compile();

    return {
        module,
        prismaServiceMock,
    };
};
