import { PrismaService } from '@/prisma.service';
import { User } from '../../../shared/src/models';
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createUser(email: string, password: string): Promise<User>;
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        password: string;
    }>;
    findById(id: number): Promise<User>;
}
