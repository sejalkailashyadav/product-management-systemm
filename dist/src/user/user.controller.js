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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const decorators_1 = require("../common/decorators");
const categories_service_1 = require("../categories/categories.service");
const roles_decorator_1 = require("src/auth/entities/roles.decorator");
const role_enum_1 = require("src/auth/entities/role.enum");
const permissions_decorator_1 = require("src/auth/entities/permissions.decorator");
const permissions_enum_1 = require("src/auth/entities/permissions.enum");
let UserController = class UserController {
    constructor(userService, categoriesService) {
        this.userService = userService;
        this.categoriesService = categoriesService;
    }
    async userPanel() {
        const users = await this.userService.getAllUser();
        return { users };
    }
    async insertUser(dto, res) {
        await this.userService.createUser(dto);
        return res.redirect("/user/users");
    }
    async deleteUserById(id) {
        await this.userService.deleteUserById(+id);
        return { message: "User deleted successfully" };
    }
    async editUser(id, dto, req) {
        const updatedUser = await this.userService.editUserById(Number(id), dto, req);
        return { user: updatedUser };
    }
    getUserPanel(req, res) {
        return this.categoriesService.findAllCategory(req, res);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/users"),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.ADMIN),
    (0, common_1.Render)("user-panel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userPanel", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/insert"),
    (0, common_1.Render)('add_user_page'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "insertUser", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserById", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/edit/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.Get)('user_home'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, permissions_decorator_1.Permissions)(permissions_enum_1.Permission.READ),
    (0, common_1.Render)('users_panel'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserPanel", null);
UserController = __decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService, categories_service_1.CategoriesService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map