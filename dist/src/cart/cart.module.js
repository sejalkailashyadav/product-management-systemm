"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_controller_1 = require("./cart.controller");
const cart_service_1 = require("./cart.service");
const prisma_module_1 = require("../prisma/prisma.module");
const product_service_1 = require("../product/product.service");
const categories_service_1 = require("../categories/categories.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const product_controller_1 = require("../product/product.controller");
const categories_controller_1 = require("../categories/categories.controller");
let CartModule = class CartModule {
};
CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: "buybuihbikhkhk",
                    signOptions: { expiresIn: "15m" },
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot(),
        ],
        controllers: [cart_controller_1.CartController, product_controller_1.ProductController, categories_controller_1.CategoriesController],
        providers: [cart_service_1.CartService, product_service_1.ProductService, categories_service_1.CategoriesService],
    })
], CartModule);
exports.CartModule = CartModule;
//# sourceMappingURL=cart.module.js.map