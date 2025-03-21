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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const models_1 = require("../../../shared/src/models");
const user_select_1 = require("../users/user.select");
let PostsService = class PostsService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createPost(authorId, dto) {
        const post = await this.prismaService.post.create({
            data: {
                ...dto,
                authorId,
            },
        });
        return models_1.PostSchema.parse(post);
    }
    async getAll(authorId) {
        return this.prismaService.post.findMany({
            where: { authorId },
            orderBy: [
                {
                    createdAt: 'desc',
                },
            ],
        });
    }
    async removePost(id, authorId) {
        return this.prismaService.post.delete({ where: { id, authorId } });
    }
    async getFeed(id) {
        return this.prismaService.post.findMany({
            where: {
                author: {
                    following: { some: { subscriberId: id } },
                },
            },
            include: {
                author: {
                    select: user_select_1.USER_SELECT,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map