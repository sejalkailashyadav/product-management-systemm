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
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
<<<<<<< HEAD
        this.jwtService = jwtService;
        this.config = config;
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
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials incorrect');
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
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied');
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
                secret: 'at-secrect',
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: 'rt-secrect',
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async getAllUser(req, res) {
        const { draw, search, order } = req.query;
        const columns = ['id', 'name', 'email'];
        const query = {
            where: {},
            select: {
                id: true,
                name: true,
                email: true,
            },
        };
        const data = await this.prisma.user.findMany(query);
        return res.json({
            draw: draw,
            data: data,
        });
    }
    async findAll() {
        let users = await this.prisma.user.findMany({
            where: {},
            select: {
                password: false,
                updatedAt: false,
                createdAt: false,
                id: true,
                name: true,
                email: true,
            },
        });
        console.log(users, 'adminpanel user getdata');
        return users;
=======
    }
    async getAllUser() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true, name: true, isadmin: true },
            where: { isadmin: false },
        });
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
    }
    async createUser(dto) {
        await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
            },
        });
    }
    async deleteUserById(id) {
        await this.prisma.user.delete({
            where: {
                id: +id,
            },
        });
    }
    async editUserById(id, dto, req) {
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                email: dto.email,
                isadmin: this.convertToBoolean(dto.isadmin),
            },
        });
        const updatedUser = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return updatedUser;
    }
    convertToBoolean(value) {
        if (typeof value === "string") {
            return value.toLowerCase() === "admin";
        }
        return Boolean(value);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map