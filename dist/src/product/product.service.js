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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prismaSerivce) {
        this.prismaSerivce = prismaSerivce;
    }
    create(createProductDto) {
        return "This action adds a new product";
    }
    async getAllprodcut() {
        return await this.prismaSerivce.product.findMany({
            include: { catrgory: true },
        });
    }
    async getAllCategories() {
        return this.prismaSerivce.category.findMany();
    }
    findOne(id) {
        return `This action returns a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
    async setprodct_category(categoryId, dto, req, res) {
        return await this.prismaSerivce.product.create({
            data: {
                product_name: dto.product_name,
                product_description: dto.product_description,
                product_price: dto.product_price,
                product_image: dto.product_image,
                catrgory: {
                    connect: { id: categoryId },
                },
            },
        });
    }
    async updatedata(categoryId, product_name, product_description, product_price, product_image, id, req, res) {
        try {
            return await this.prismaSerivce.product.update({
                where: { id: +id },
                data: {
                    product_name: product_name,
                    catrgory: {
                        connect: { id: +categoryId },
                    },
                },
                include: { catrgory: true },
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async editUserById(id, product_name, product_description, product_price, categoryId, req) {
        await this.prismaSerivce.product.update({
            where: {
                id: id,
            },
            data: {
                product_name: product_name,
                product_description: product_description,
                product_price: product_price,
                catrgory: {
                    connect: {
                        id: +categoryId,
                    },
                },
            },
            include: { catrgory: true },
        });
    }
    async deleteproductById(id) {
        await this.prismaSerivce.product.delete({
            where: {
                id: +id,
            },
        });
    }
    async usersAllProducts(req, res) {
        try {
            const products = await this.prismaSerivce.product.findMany({
                include: {
                    catrgory: true,
                },
            });
            console.log(products);
            console.log("pwithc", products[0].catrgory[0].category_name);
            return { products };
        }
        catch (err) {
            throw err;
        }
    }
    async findProductById(id, req, res) {
        try {
            const product = await this.prismaSerivce.product.findUnique({
                where: {
                    id,
                },
                include: {
                    catrgory: true,
                },
            });
            console.log("pro", product);
            return { product };
        }
        catch (err) {
            throw err;
        }
    }
    async findAllProducts() {
        try {
            const query = {
                include: { catrgory: true },
            };
            return await this.prismaSerivce.product.findMany(query);
        }
        catch (err) {
            throw err;
        }
    }
    async productByCategory(category_name, res, req) {
        try {
            const products = await this.prismaSerivce.product.findMany({
                where: {
                    catrgory: {
                        some: {
                            category_name: {
                                contains: category_name,
                            },
                        },
                    },
                },
                include: {
                    catrgory: true,
                },
            });
            console.log("pbyc", products);
            res.render("user_home_page", { products });
        }
        catch (err) {
            throw err;
        }
    }
    async findProduct(id) {
        try {
            return await this.prismaSerivce.product.findUnique({
                where: { id },
                include: {
                    catrgory: true,
                },
            });
        }
        catch (err) {
            throw err;
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map