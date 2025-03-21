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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipController = void 0;
const common_1 = require("@nestjs/common");
const friendship_service_1 = require("./friendship.service");
const api_1 = require("../../../shared/src/api");
let FriendshipController = class FriendshipController {
    friendshipService;
    constructor(friendshipService) {
        this.friendshipService = friendshipService;
    }
    async followUser(req, targetUserId) {
        return this.friendshipService.followUser(req.user?.id, Number(targetUserId));
    }
    async unfollowUser(req, targetUserId) {
        return this.friendshipService.unfollowUser(req.user?.id, Number(targetUserId));
    }
};
exports.FriendshipController = FriendshipController;
__decorate([
    (0, common_1.Post)(api_1.API_ROUTES.FRIENDSHIP.FOLLOW),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "followUser", null);
__decorate([
    (0, common_1.Delete)(api_1.API_ROUTES.FRIENDSHIP.FOLLOW),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unfollowUser", null);
exports.FriendshipController = FriendshipController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService])
], FriendshipController);
//# sourceMappingURL=friendship.controller.js.map