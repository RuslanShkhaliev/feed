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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_1 = require("../users");
const constants_1 = require("./constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../../shared/src/models");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(authCredentials) {
        const hash = await bcrypt_1.default.hash(authCredentials.password, constants_1.jwtConstants.saltRounds);
        const user = await this.usersService.createUser(authCredentials.email, hash);
        return this.generateAuthTokens(user);
    }
    async login(email) {
        const user = await this.usersService.findByEmail(email);
        return this.generateAuthTokens(user);
    }
    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('No refresh token');
        }
        try {
            const { sub: userId } = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
            const user = await this.usersService.findById(userId);
            return this.signAccessToken(user);
        }
        catch (_error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateUserById(id) {
        return this.usersService.findById(id);
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        try {
            return models_1.UserSchema.parse(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Invalid user data format');
        }
    }
    generateAuthTokens(user) {
        return {
            user,
            accessToken: this.signAccessToken(user),
            refreshToken: this.signRefreshToken(user),
        };
    }
    signAccessToken({ id, email }) {
        return this.jwtService.sign({ sub: id, email }, { secret: process.env.JWT_SECRET, expiresIn: '7d' });
    }
    signRefreshToken({ id, email }) {
        return this.jwtService.sign({ sub: id, email }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map