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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
    }
    async getAllUser() {
        const columns = ["id", "name", "email", "isadmin"];
        const query = {
            where: {},
            select: {
                id: true,
                name: true,
                email: true,
                isadmin: true,
            },
        };
        return await this.prisma.user.findMany();
    }
    async create(dto, req, res) {
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user
            .create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hash,
            },
        })
            .catch((error) => {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            throw error;
        });
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async refreshTokens(userId, rt) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRt)
            throw new common_1.ForbiddenException("Access Denied");
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches)
            throw new common_1.ForbiddenException("Access Denied");
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }
    async getTokens(userId, email) {
        const jwtPayload = {
            sub: userId,
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: "at-secrect",
                expiresIn: "15m",
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: "rt-secrect",
                expiresIn: "7d",
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async deleteUserById(id) {
        return await this.prisma.user.delete({
            where: {
                id: +id,
            },
        });
    }
    async editUserById(id, dto, req, res) {
        let isAdmin = false;
        if (typeof dto.isadmin === "string") {
            isAdmin = dto.isadmin.toLowerCase() === "admin";
        }
        else if (typeof dto.isadmin === "boolean") {
            isAdmin = dto.isadmin;
        }
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                email: dto.email,
                isadmin: isAdmin,
            },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map