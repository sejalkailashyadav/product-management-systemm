"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("../prisma/prisma.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    secret: "buybuihbikhkhk",
                    signOptions: { expiresIn: "15m" },
                }),
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot(),
            prisma_module_1.PrismaModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map