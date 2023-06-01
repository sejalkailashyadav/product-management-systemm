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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prismaSerivce) {
        this.prismaSerivce = prismaSerivce;
    }
    create(createCartDto) {
        return 'This action adds a new cart';
    }
    findAll() {
        return `This action returns all cart`;
    }
    findOne(id) {
        return `This action returns a #${id} cart`;
    }
    update(id, updateCartDto) {
        return `This action updates a #${id} cart`;
    }
    remove(id) {
        return `This action removes a #${id} cart`;
    }
    async addToCart(userId, productId, quantity) {
        const cartItem = await this.prismaSerivce.cart.findFirst({
            where: {
                user_id: userId,
                product_id: productId,
            },
        });
        if (cartItem) {
            await this.prismaSerivce.cart.update({
                where: {
                    id: cartItem.id,
                },
                data: {
                    quantity: cartItem.quantity + quantity,
                },
            });
        }
        else {
            await this.prismaSerivce.cart.create({
                data: {
                    user_id: userId,
                    product_id: productId,
                    quantity,
                },
            });
        }
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map