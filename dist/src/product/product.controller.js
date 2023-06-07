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
let ProductController = class ProductController {
    constructor(productService, categoriesService) {
        this.productService = productService;
        this.categoriesService = categoriesService;
    }
    userProductPage(req, res) {
        return this.productService.usersAllProducts(req, res);
    }
    showProductInCart(id, req, res) {
        return this.productService.findProductById(Number(id), req, res);
    }
    productDetailPage(req, res) { }
    productData() {
        return this.productService.findAllProducts();
    }
    async productByCategory(category_name, res, req) {
        const products = await this.productService.productByCategory(category_name, res, req);
        return { products: products };
    }
    findProduct(id) {
        return this.productService.findProduct(id);
    }
    async findClickedProduct(id, req, res) {
        return await this.productService.findProductById(Number(id), req, res);
    }
    async insertUser(dto, res, req) {
        const { categoryId } = req.body;
        const category_id = categoryId[0];
        await this.productService.createUser(dto, res, category_id);
        return res.redirect("/product/all");
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
    async adminPanel() {
        try {
            const products = await this.productService.getAllprodcut();
            const categories = await this.categoriesService.getAllCategories();
            return { products: products, categories: categories };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteproduct_category(id) {
        await this.productService.deleteproductById(+id);
        return { message: "product& category deleted successfully" };
    }
    async editUser(id, product_name, product_description, product_price, categoryId, req) {
        const updatedUser = await this.productService.editUserById(Number(id), product_name, product_description, product_price, categoryId, req);
        return { updatedUser: updatedUser };
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/user_product"),
    (0, common_1.Render)("user_home_page"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "userProductPage", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/cart/:id"),
    (0, common_1.Render)("product_Details"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "showProductInCart", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/product_details"),
    (0, common_1.Render)("product_Details"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "productDetailPage", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "productData", null);
__decorate([
    (0, common_1.Get)("/product_by_cat/:category_name"),
    (0, common_1.Render)("user_home_page"),
    __param(0, (0, common_1.Param)("category_name")),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productByCategory", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("product/edit/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findProduct", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("product/:id"),
    (0, common_1.Render)("product_Details"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findClickedProduct", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/products"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "insertUser", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/search"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "userPanell", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/all"),
    (0, common_1.Render)("product"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "adminPanel", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Delete)("/delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteproduct_category", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Patch)("/edit/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("product_name")),
    __param(2, (0, common_1.Body)("product_description")),
    __param(3, (0, common_1.Body)("product_price")),
    __param(4, (0, common_1.Body)("categoryId")),
    __param(5, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "editUser", null);
ProductController = __decorate([
    (0, common_1.Controller)("Product"),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        categories_service_1.CategoriesService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map