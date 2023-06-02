import { AddToCartDto } from '../cart/dto/create-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from "@nestjs/jwt";
export declare class CartService {
    private readonly prismaSerivce;
    private jwtService;
    constructor(prismaSerivce: PrismaService, jwtService: JwtService);
    create(createCartDto: AddToCartDto): string;
    doSomethingWithToken(token: string): Promise<any>;
    getCartItems(userId: number): Promise<(import(".prisma/client").Cart & {
        product: import(".prisma/client").Product;
        user: import(".prisma/client").User;
    })[]>;
    addToCart(userId: number, productId: number, quantity: number): Promise<void>;
}
