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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const isPublic_1 = require("../decorators/isPublic");
const guards_1 = require("../guards");
const api_1 = require("../../../shared/src/api");
const zod_pipe_1 = require("../validation/zod.pipe");
const models_1 = require("../../../shared/src/models");
function getCookiesOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
}
const REFRESH_TOKEN_KEY = 'refreshToken';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(data, res) {
        const { refreshToken, accessToken, user } = await this.authService.register(data);
        res.cookie(REFRESH_TOKEN_KEY, refreshToken, getCookiesOptions());
        return {
            accessToken,
            user,
        };
    }
    async login({ email }, res) {
        const { user, accessToken, refreshToken } = await this.authService.login(email);
        res.cookie(REFRESH_TOKEN_KEY, refreshToken, getCookiesOptions());
        return {
            user,
            accessToken,
        };
    }
    async refreshToken(req) {
        const { refreshToken } = req.cookies;
        return this.authService.refreshToken(refreshToken);
    }
    logout(res) {
        res.clearCookie(REFRESH_TOKEN_KEY, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.json({ message: 'Logged out successfully' });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, isPublic_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(api_1.API_ROUTES.AUTH.REGISTER),
    (0, common_1.UsePipes)(new zod_pipe_1.ZodValidationPipe(models_1.AuthCredentialsSchema)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, isPublic_1.Public)(),
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(api_1.API_ROUTES.AUTH.LOGIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(api_1.API_ROUTES.AUTH.REFRESH),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(api_1.API_ROUTES.AUTH.LOGOUT),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map