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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_service_1 = require("../product/product.service");
const decorators_1 = require("../common/decorators");
const categories_service_1 = require("../categories/categories.service");
const cart_service_1 = require("../cart/cart.service");
let ProductController = class ProductController {
    constructor(productService, categoriesService, cartService) {
        this.productService = productService;
        this.categoriesService = categoriesService;
        this.cartService = cartService;
    }
    createPost(categoryId, dto, req, res) {
        return this.productService.setprodct_category(Number(categoryId), dto, req, res);
        return res.redirect('/product_add');
    }
    async userPanel() {
        try {
            const products = await this.productService.getAllprodcut();
            const categories = await this.categoriesService.getAllCategories();
            return { products, categories };
        }
        catch (error) {
            throw error;
        }
    }
    async userPanell() {
        try {
            const products = await this.productService.getAllprodcut();
            const categories = await this.categoriesService.getAllCategories();
            const cart = {};
            return { products, categories, cart };
        }
        catch (error) {
            throw error;
        }
    }
    findOne(id) {
        return this.productService.findOne(+id);
    }
    async deleteproduct_category(id, dto, req, res) {
        return this.productService.deleteproductById(Number(id), dto, res, req);
    }
    async addToCartt(userId, req, quantity, id) {
        console.log(userId);
        return this.cartService.addToCart(userId, id, quantity);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("products/:categoryId"),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Param)("categoryId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/products"),
    (0, common_1.Render)("product_add"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "userPanel", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/home"),
    (0, common_1.Render)("user_Panel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "userPanell", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteproduct_category", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(':id/add-to-cart'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('quantity')),
    __param(3, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addToCartt", null);
ProductController = __decorate([
    (0, common_1.Controller)("/Product"),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        categories_service_1.CategoriesService,
        cart_service_1.CartService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map