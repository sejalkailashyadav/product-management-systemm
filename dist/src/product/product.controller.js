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
        console.log("psss");
        return this.productService.findAllProducts();
    }
    async productByCategory(category_name, res, req) {
        const products = await this.productService.productByCategory(category_name, res, req);
        return { products: products };
    }
    findProduct(id) {
        console.log("inside get product");
        return this.productService.findProduct(id);
    }
    async findClickedProduct(id, req, res) {
        console.log("inside get product by id");
        return await this.productService.findProductById(Number(id), req, res);
    }
    createPost(categoryId, dto, req, res) {
        return this.productService.setprodct_category(Number(categoryId), dto, req, res);
        return res.redirect('/product_add');
    }
    async adminPanel() {
        try {
            const products = await this.productService.getAllprodcut();
            const categories = await this.categoriesService.getAllCategories();
            console.log(products, categories);
            return { products: products, categories: categories };
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
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/user_product'),
    (0, common_1.Render)('user_home_page'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "userProductPage", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/cart/:id'),
    (0, common_1.Render)('product_Details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "showProductInCart", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/product_details'),
    (0, common_1.Render)('product_Details'),
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
    (0, common_1.Get)('/product_by_cat/:category_name'),
    (0, common_1.Render)('user_home_page'),
    __param(0, (0, common_1.Param)('category_name')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productByCategory", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('product/edit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findProduct", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('product/:id'),
    (0, common_1.Render)('product_Details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findClickedProduct", null);
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
    (0, common_1.Get)("/all"),
    (0, common_1.Render)("product"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "adminPanel", null);
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
ProductController = __decorate([
    (0, common_1.Controller)("/Product"),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        categories_service_1.CategoriesService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map