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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const product_service_1 = require("../product/product.service");
const categories_service_1 = require("../categories/categories.service");
const decorators_1 = require("../common/decorators");
const jwt_1 = require("@nestjs/jwt");
let CartController = class CartController {
    constructor(jwtService, cartService, productService, categoriesService) {
        this.jwtService = jwtService;
        this.cartService = cartService;
        this.productService = productService;
        this.categoriesService = categoriesService;
    }
    async findAll(req, res) {
        console.log(req.headers);
        const { cookie } = req.headers;
        console.log(cookie);
        const user = JSON.parse(Buffer.from(cookie.split(".")[1], "base64").toString("utf-8"));
        console.log(user.sub, user.email);
        const userId = user.sub;
        return await this.cartService.getCartItems(+userId, req, res);
    }
    async addToCart(data, req, res, productId) {
        try {
            const { quantity } = data;
            console.log(req.headers);
            const { cookie } = req.headers;
            console.log(cookie);
            const user = JSON.parse(Buffer.from(cookie.split(".")[1], "base64").toString("utf-8"));
            console.log(user.sub, user.email);
            const userId = user.sub;
            const cart = await this.cartService.addToCart(userId, productId, quantity, req, res);
            console.log(cart);
            res.redirect("prodcut_categorye", { cart });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    remove(id, req, res) {
        return this.cartService.remove(id, req, res);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Render)("prodcut_categorye"),
    (0, common_1.Get)("/all"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("add/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "remove", null);
CartController = __decorate([
    (0, common_1.Controller)("cart"),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        cart_service_1.CartService,
        product_service_1.ProductService,
        categories_service_1.CategoriesService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map