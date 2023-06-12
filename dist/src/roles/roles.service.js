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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const create_role_dto_1 = require("./dto/create-role.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let RolesService = class RolesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createRoleDto) {
        const { name } = create_role_dto_1.CreateRoleDto;
        return await this.prismaService.role.create({
            data: {
                name,
            },
            include: {
                permissions: true,
            },
        });
    }
    async findAll() {
        const roles = await this.prismaService.role.findMany({
            include: {
                permissions: true,
            },
        });
        const permissions = await this.prismaService.permission.findMany({});
        console.log(permissions, roles);
        return { roles, permissions };
    }
    async getAllPermissions(req, res) {
        const permission = await this.prismaService.permission.findMany({});
        res.send(permission);
    }
    async createPermissions(permission_name) {
        return await this.prismaService.permission.create({
            data: {
                name: permission_name,
            },
        });
    }
    async updatePermission(roleId, permissionId) {
        console.log('update permission');
        await this.prismaService.role.update({
            where: { id: +roleId },
            data: {
                permissions: {
                    set: [],
                },
            },
        });
        return await this.prismaService.role.update({
            where: { id: +roleId },
            data: {
                permissions: {
                    connect: { id: permissionId },
                },
            },
            include: {
                permissions: true,
            },
        });
    }
    async updatePermissionn(roleId, permissionIds) {
        await this.prismaService.role.update({
            where: { id: +roleId },
            data: {
                permissions: {
                    set: [],
                },
            },
        });
        return await this.prismaService.role.update({
            where: { id: +roleId },
            data: {
                permissions: {
                    connect: permissionIds.map((id) => ({ id })),
                },
            },
            include: {
                permissions: true,
            },
        });
    }
    async findOne(id) {
        return await this.prismaService.role.findUnique({
            where: { id: id },
            include: {
                permissions: true,
            },
        });
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map