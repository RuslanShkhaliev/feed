import { UsersService } from '@/modules/users/users.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { createModuleWithPrisma, FactoryEntityMock, PrismaServiceMock } from '@test/factories';

describe('UsersService', () => {
    let service: UsersService;
    let prisma: PrismaServiceMock;

    beforeEach(async () => {
        const { module, prismaServiceMock } = await createModuleWithPrisma({
            providers: [UsersService],
        });

        prisma = prismaServiceMock;
        service = module.get(UsersService);
    });

    const mockUser = FactoryEntityMock.createUser({
        name: '',
        createdAt: new Date(),
    });

    const userReturn = { ...mockUser };

    Reflect.deleteProperty(userReturn, 'password');

    describe('createUser', () => {
        it('should create user successfully', async () => {
            prisma.user.create.mockResolvedValueOnce(mockUser);

            const user = await service.createUser(mockUser.email, mockUser.password);

            expect(user).toEqual(userReturn);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    email: mockUser.email,
                    password: mockUser.password,
                    name: mockUser.name,
                },
            });
        });

        it('should throw ConflictException if email already exists', async () => {
            prisma.user.create.mockRejectedValueOnce(
                new PrismaClientKnownRequestError('Unique error', {
                    code: 'P2002',
                    clientVersion: '4.0.0',
                }),
            );
            await expect(service.createUser(mockUser.email, mockUser.password)).rejects.toThrow(
                ConflictException,
            );
        });
    });

    describe('findById', () => {
        it('should return user by id if found', async () => {
            prisma.user.findUnique.mockResolvedValue(mockUser);

            const user = await service.findById(mockUser.id);

            expect(user).toEqual(userReturn);
        });

        it('should throw NotFoundException if not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(service.findById(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('findByEmail', () => {
        it('should return user with password by email if found', async () => {
            prisma.user.findUnique.mockResolvedValue(mockUser);

            const user = await service.findByEmail(mockUser.email);

            expect(user).toEqual(mockUser);
        });

        it('should throw NotFoundException if not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            await expect(service.findByEmail('mock@mail.ru')).rejects.toThrow(NotFoundException);
        });
    });
});
