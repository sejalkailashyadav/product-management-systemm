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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const decorators_1 = require("../common/decorators");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async findAll() {
        return await this.orderService.findAll();
    }
    async user_order(req, res) {
        try {
            return { msg: "order" };
        }
        catch (error) {
            throw error;
        }
    }
    async user_cart(req, res) {
        try {
            return { msg: "cart" };
        }
        catch (error) {
            throw error;
        }
    }
    insertuser() {
        return this.orderService.create();
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/product"),
    (0, common_1.Render)("product"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/order"),
    (0, common_1.Render)("order"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "user_order", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/cart"),
    (0, common_1.Render)("cart"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "user_cart", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/insert"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "insertuser", null);
OrderController = __decorate([
    (0, common_1.Controller)("/dashboard"),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map