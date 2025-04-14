import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@feed/shared/models';
import { createUser } from '@/common/factory';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}
    public async createUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email,
                    password,
                    name: '',
                },
            });

            return createUser(user);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    public async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return user;
    }
    public async findById(id: number): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return createUser(user);
    }
}
