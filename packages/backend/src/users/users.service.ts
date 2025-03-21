import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { User, UserSchema } from '@feed/shared/models';

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

      return UserSchema.parse(user);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // P2002: Unique constraint failed on the fields: (`email`)
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

    return UserSchema.parse(user);
  }
}
