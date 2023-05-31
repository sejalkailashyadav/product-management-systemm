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
const multer_1 = require("multer");
const create_product_dto_1 = require("./dto/create-product.dto");
const product_service_1 = require("../product/product.service");
const decorators_1 = require("../common/decorators");
const categories_service_1 = require("../categories/categories.service");
const platform_express_1 = require("@nestjs/platform-express");
let ProductController = class ProductController {
    constructor(productService, categoriesService) {
        this.productService = productService;
        this.categoriesService = categoriesService;
    }
    createPost(categoryId, dto, req, res, file) {
        return this.productService.setprodct_category(Number(categoryId), dto, req, res, file);
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
    findOne(id) {
        return this.productService.findOne(+id);
    }
    remove(id) {
        return this.productService.remove(+id);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(":categoryId/products"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("product_image", {
        storage: (0, multer_1.diskStorage)({
            destination: "./public",
            filename(req, file, callback) {
                callback(null, `${file.originalname}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)("categoryId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.CreateProductDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createPost", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/getallproduct"),
    (0, common_1.Render)("product_add"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "userPanel", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
ProductController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [product_service_1.ProductService, categories_service_1.CategoriesService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map