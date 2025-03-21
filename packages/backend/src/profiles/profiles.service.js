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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const createPublicUser_1 = require("../users/createPublicUser");
const user_select_1 = require("../users/user.select");
let ProfilesService = class ProfilesService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getMutualFriends(id) {
        return this.prismaService.user
            .findMany({
            where: {
                AND: [
                    {
                        following: { some: { subscriberId: id } },
                    },
                    {
                        subscribers: { some: { followingId: id } },
                    },
                ],
            },
            select: user_select_1.USER_SELECT,
        })
            .then((users) => users.map((user) => (0, createPublicUser_1.createPublicUser)(user, true, true)));
    }
    async getRecommended(id) {
        return this.prismaService.user
            .findMany({
            where: {
                AND: [
                    { subscribers: { none: { followingId: id } } },
                    { following: { none: { subscriberId: id } } },
                    { id: { not: id } },
                ],
            },
            select: user_select_1.USER_SELECT,
        })
            .then((users) => users.map((user) => (0, createPublicUser_1.createPublicUser)(user, false, false)));
    }
    async getSubscribers(id) {
        return this.prismaService.user
            .findMany({
            where: {
                AND: [
                    { subscribers: { some: { followingId: id } } },
                    { following: { none: { subscriberId: id } } },
                ],
            },
            select: user_select_1.USER_SELECT,
        })
            .then((users) => users.map((user) => (0, createPublicUser_1.createPublicUser)(user, true, false)));
    }
    async getFollowings(id) {
        return this.prismaService.user
            .findMany({
            where: {
                AND: [
                    { subscribers: { none: { followingId: id } } },
                    { following: { some: { subscriberId: id } } },
                ],
            },
            select: user_select_1.USER_SELECT,
        })
            .then((users) => users.map((user) => (0, createPublicUser_1.createPublicUser)(user, false, true)));
    }
    async getProfileById(userId, profileId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: profileId },
            select: {
                ...user_select_1.USER_SELECT,
                subscribers: {
                    where: { subscriberId: userId },
                    select: { id: true },
                },
                following: {
                    where: { followingId: userId },
                    select: { id: true },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        const isSubscriber = user.subscribers.length > 0;
        const isFollowing = user.following.length > 0;
        return (0, createPublicUser_1.createPublicUser)(user, isSubscriber, isFollowing);
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map