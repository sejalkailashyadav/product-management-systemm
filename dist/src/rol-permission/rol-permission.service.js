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
exports.RolPermissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RolPermissionService = class RolPermissionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllroles() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true, name: true, isadmin: true },
            where: { isadmin: false },
        });
    }
    async findAllPermission() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true, name: true, isadmin: true },
            where: { isadmin: false },
        });
    }
    findOne(id) {
        return `This action returns a #${id} rolPermission`;
    }
    update(id, updateRolPermissionDto) {
        return `This action updates a #${id} rolPermission`;
    }
    remove(id) {
        return `This action removes a #${id} rolPermission`;
    }
};
RolPermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolPermissionService);
exports.RolPermissionService = RolPermissionService;
//# sourceMappingURL=rol-permission.service.js.map