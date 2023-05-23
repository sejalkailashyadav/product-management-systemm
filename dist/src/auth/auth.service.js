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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
const dto_1 = require("./dto");
const crypto_1 = require("crypto");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "codebackup122@gmail.com",
                pass: "uuceenmlfvmxcnos",
            },
        });
    }
    async forgotPassword(email, req, res) {
        const resetToken = await this.generateSecureToken();
        await this.prisma.user.update({
            where: { email },
            data: { resetToken },
        });
        const mailOptions = {
            from: "codebackup122@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `Your password reset token is: ${resetToken}`,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async resetPassword(email, token, newPassword, req, res) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.resetToken !== token) {
            throw new Error("Invalid reset token");
        }
        const hashedPassword = await argon.hash(newPassword);
        await this.prisma.user.update({
            where: { email },
            data: { password: hashedPassword, resetToken: null },
        });
    }
    async generateSecureToken() {
        return new Promise((resolve, reject) => {
            (0, crypto_1.randomBytes)(20, (err, buf) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(buf.toString("hex"));
                }
            });
        });
    }
    async signupLocal(dto, req, res) {
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
        res.redirect("/auth/local/signup");
        return tokens;
    }
    async signinLocal(dto, req, res) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException("Access Denied");
        const passwordMatches = await argon.verify(user.password, dto.password);
        if (!passwordMatches)
            throw new common_1.ForbiddenException("Access Denied");
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        const users = await this.prisma.user.findMany({
            select: { id: true, email: true, name: true },
            where: { isadmin: false },
        });
        res.render("user-panel", { user, users });
        return tokens;
    }
    async logout(userId, req, res) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        });
        return true;
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
};
__decorate([
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "forgotPassword", null);
__decorate([
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signinLocal", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map