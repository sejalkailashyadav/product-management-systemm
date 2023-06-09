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
exports.RolPermissionController = void 0;
const common_1 = require("@nestjs/common");
const rol_permission_service_1 = require("./rol-permission.service");
const update_rol_permission_dto_1 = require("./dto/update-rol-permission.dto");
const decorators_1 = require("../common/decorators");
let RolPermissionController = class RolPermissionController {
    constructor(rolPermissionService) {
        this.rolPermissionService = rolPermissionService;
    }
    async findAllroles() {
        const users = await this.rolPermissionService.findAllroles();
        return { users: users };
    }
    async findAllPermission() {
        const users = await this.rolPermissionService.findAllPermission();
        return { users: users };
    }
    findOne(id) {
        return this.rolPermissionService.findOne(+id);
    }
    update(id, updateRolPermissionDto) {
        return this.rolPermissionService.update(+id, updateRolPermissionDto);
    }
    remove(id) {
        return this.rolPermissionService.remove(+id);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Render)("role"),
    (0, common_1.Get)("role"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolPermissionController.prototype, "findAllroles", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Render)("permission"),
    (0, common_1.Get)("permission"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolPermissionController.prototype, "findAllPermission", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolPermissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rol_permission_dto_1.UpdateRolPermissionDto]),
    __metadata("design:returntype", void 0)
], RolPermissionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolPermissionController.prototype, "remove", null);
RolPermissionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [rol_permission_service_1.RolPermissionService])
], RolPermissionController);
exports.RolPermissionController = RolPermissionController;
//# sourceMappingURL=rol-permission.controller.js.map