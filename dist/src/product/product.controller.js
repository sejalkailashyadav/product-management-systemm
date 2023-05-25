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
const product_service_1 = require("../product/product.service");
const decorators_1 = require("../common/decorators");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
<<<<<<< HEAD
    signup() {
        return { msg: "sejal" };
=======
    async findAll(req, res) {
        const users = await this.productService.findAll();
        return { users };
>>>>>>> 0f78aad526f4ac80a9d6205a04c9551710dbc894
    }
    upadetcatgo_prod() {
        return this.productService.updatedata();
    }
    createPost() {
        return this.productService.setprodct_category();
    }
};
__decorate([
    (0, decorators_1.Public)(),
<<<<<<< HEAD
    (0, common_1.Get)("data"),
    (0, common_1.Render)("products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "signup", null);
=======
    (0, common_1.Get)("/product"),
    (0, common_1.Render)("product"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
>>>>>>> 0f78aad526f4ac80a9d6205a04c9551710dbc894
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/create-poduct-update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "upadetcatgo_prod", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/create-poduct"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createPost", null);
ProductController = __decorate([
    (0, common_1.Controller)("product"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map