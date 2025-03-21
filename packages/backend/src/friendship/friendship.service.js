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
exports.FriendshipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const createPublicUser_1 = require("../users/createPublicUser");
const user_select_1 = require("../users/user.select");
let FriendshipService = class FriendshipService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async followUser(userId, targetUserId) {
        if (userId === targetUserId) {
            throw new common_1.BadRequestException('Нельзя подписаться на самого себя');
        }
        try {
            const { following } = await this.prismaService.friendship.create({
                data: { subscriberId: userId, followingId: targetUserId },
                include: {
                    following: {
                        select: user_select_1.USER_SELECT,
                    },
                },
            });
            const isSubscriber = await this.checkSubscribe(targetUserId, userId);
            return (0, createPublicUser_1.createPublicUser)(following, isSubscriber, true);
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new common_1.BadRequestException('Вы уже подписаны на этого пользователя');
            }
            throw error;
        }
    }
    async unfollowUser(userId, targetUserId) {
        try {
            const { following } = await this.prismaService.friendship.delete({
                where: {
                    subscriberId_followingId: {
                        subscriberId: userId,
                        followingId: targetUserId,
                    },
                },
                include: {
                    following: {
                        select: user_select_1.USER_SELECT,
                    },
                },
            });
            const isSubscriber = await this.checkSubscribe(targetUserId, userId);
            return (0, createPublicUser_1.createPublicUser)(following, isSubscriber, false);
        }
        catch (error) {
            throw new common_1.NotFoundException('Вы не подписаны на пользователя');
        }
    }
    async checkSubscribe(subscriberId, followingId) {
        const friendShip = await this.prismaService.friendship.findFirst({
            where: {
                subscriberId,
                followingId,
            },
        });
        return !!friendShip;
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendshipService);
//# sourceMappingURL=friendship.service.js.map