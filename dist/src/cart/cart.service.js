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
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createCartDto, req, res) {
        return this.prismaService.cart.create({ data: createCartDto });
    }
    async addItemtoCart(productId, quantity, total, req, res) {
        try {
            console.log(req.headers);
            const { cookie } = req.headers;
            console.log(cookie);
            const user = JSON.parse(Buffer.from(cookie.split(".")[1], "base64").toString("utf-8"));
            console.log(user.sub, user.email);
            const userId = user.sub;
            const cartItem = await this.prismaService.cart.findFirst({ where: { productId: +productId, userId: +userId } });
            console.log("cartItem", cartItem);
            if (!cartItem) {
                const carts = await this.prismaService.cart.create({
                    data: {
                        productId: +productId,
                        userId: +userId,
                        quantity: +quantity,
                        total: +total
                    }
                });
                console.log("heyyy");
                res.redirect('/cart/cart_page');
            }
            else {
                const upatecart = await this.prismaService.cart.update({
                    where: { id: cartItem.id },
                    data: {
                        productId: +productId,
                        userId: +userId,
                        quantity: +(cartItem.quantity + quantity),
                        total: +(cartItem.total + total)
                    }
                });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getAllCart(req, res) {
        console.log(req.headers);
        const { cookie } = req.headers;
        console.log(cookie);
        const user = JSON.parse(Buffer.from(cookie.split(".")[1], "base64").toString("utf-8"));
        console.log(user.sub, user.email);
        const userId = user.sub;
        const carts = await this.prismaService.cart.findMany({
            where: { userId: userId },
            include: {
                user: true,
                product: true
            },
        });
        console.log("get all cart");
        console.log("carts", carts);
        return { carts };
    }
    async clearCart(req, res) {
        const { token } = req.cookies;
        const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
        console.log(user.id);
        const userId = user.id;
        await this.prismaService.cart.deleteMany({ where: {
                userId: userId
            } });
    }
    async remove(id, req, res) {
        await this.prismaService.cart.delete({ where: { id: id } });
    }
    async getProductByCart(req, res) {
        const { token } = req.cookies;
        const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
        console.log(user.id);
        const userId = user.id;
        console.log("dfjskhg", await this.prismaService.cart.findMany({ where: { userId: userId } }));
        const pbycart = await this.prismaService.cart.findMany({ where: { userId: userId } });
        res.send(pbycart);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map