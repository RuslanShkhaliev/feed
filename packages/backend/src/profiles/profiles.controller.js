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
exports.ProfilesController = void 0;
const common_1 = require("@nestjs/common");
const profiles_service_1 = require("./profiles.service");
const api_1 = require("../../../shared/src/api");
var ProfilesQueryType;
(function (ProfilesQueryType) {
    ProfilesQueryType["All"] = "all";
    ProfilesQueryType["Recommended"] = "recommended";
    ProfilesQueryType["Subscribers"] = "subscribers";
    ProfilesQueryType["Following"] = "following";
})(ProfilesQueryType || (ProfilesQueryType = {}));
let ProfilesController = class ProfilesController {
    profilesService;
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    async getProfiles(req, query) {
        if (!query) {
            throw new common_1.BadRequestException('Section is required');
        }
        switch (query) {
            case ProfilesQueryType.All:
                return this.profilesService.getMutualFriends(req.user.id);
            case ProfilesQueryType.Recommended:
                return this.profilesService.getRecommended(req.user.id);
            case ProfilesQueryType.Subscribers:
                return this.profilesService.getSubscribers(req.user.id);
            case ProfilesQueryType.Following:
                return this.profilesService.getFollowings(req.user.id);
            default:
                throw new common_1.BadRequestException('Invalid section value');
        }
    }
    async getProfileById(profileId, req) {
        return this.profilesService.getProfileById(req.user.id, Number(profileId));
    }
};
exports.ProfilesController = ProfilesController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('section')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getProfiles", null);
__decorate([
    (0, common_1.Get)(api_1.API_ROUTES.PROFILES.PROFILE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getProfileById", null);
exports.ProfilesController = ProfilesController = __decorate([
    (0, common_1.Controller)(api_1.API_ROUTES.PROFILES.ENDPOINT),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfilesController);
//# sourceMappingURL=profiles.controller.js.map