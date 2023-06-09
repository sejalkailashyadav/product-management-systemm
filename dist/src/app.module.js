"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const guards_1 = require("./common/guards");
const user_module_1 = require("./user/user.module");
const categories_module_1 = require("./categories/categories.module");
const platform_express_1 = require("@nestjs/platform-express");
const product_module_1 = require("./product/product.module");
const admin_module_1 = require("./admin/admin.module");
const cart_module_1 = require("./cart/cart.module");
const orders_module_1 = require("./orders/orders.module");
const rol_permission_module_1 = require("./rol-permission/rol-permission.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            categories_module_1.CategoriesModule,
            platform_express_1.MulterModule.register({
                dest: "./files",
            }),
            product_module_1.ProductModule,
            admin_module_1.AdminModule,
            cart_module_1.CartModule,
            orders_module_1.OrdersModule,
            rol_permission_module_1.RolPermissionModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map