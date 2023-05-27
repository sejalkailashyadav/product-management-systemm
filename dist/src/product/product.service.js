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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prismaSerivce) {
        this.prismaSerivce = prismaSerivce;
    }
    async findAll(req, res) {
        const cate_product = await this.prismaSerivce.product.findMany({
            include: { catrgory: true },
        });
        res.render("user_Panel", { cate_product });
        console.log(cate_product);
    }
    async deleteUserById(id, dto, req, res) {
        await this.prismaSerivce.product.delete({
            where: {
                id: id,
            },
        });
    }
    async setprodct_category(dto, req, res, file) {
        return await this.prismaSerivce.product.create({
            data: {
                product_name: dto.product_name,
                product_description: dto.product_description,
                product_price: dto.product_price,
                product_image: dto.product_image,
                catrgory: {
                    create: [{ category_name: dto.category_name }],
                },
            },
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "findAll", null);
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map