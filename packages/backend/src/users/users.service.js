"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client/runtime/client");
const models_1 = require("../../../shared/src/models");
let UsersService = class UsersService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createUser(email, password) {
        try {
            const user = await this.prismaService.user.create({
                data: {
                    email,
                    password,
                    name: '',
                },
            });
            return models_1.UserSchema.parse(user);
        }
        catch (error) {
            if (error instanceof client_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.ConflictException('User already exists');
            }
            throw error;
        }
    }
    async findByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    async findById(id) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return models_1.UserSchema.parse(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map