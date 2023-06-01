import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CartService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    create(createCartDto: CreateCartDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCartDto: UpdateCartDto): string;
    remove(id: number): string;
    addToCart(userId: number, productId: number, quantity: number): Promise<void>;
}
