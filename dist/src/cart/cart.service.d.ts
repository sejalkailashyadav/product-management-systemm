import { AddToCartDto } from '../cart/dto/create-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    create(createCartDto: AddToCartDto): string;
    findAll(): string;
    findOne(id: number): string;
    addToCart(userId: number, productId: number, quantity: number): Promise<void>;
}
