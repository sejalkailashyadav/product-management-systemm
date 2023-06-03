import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class CartService {
    private readonly prismaSerivce;
    private jwtService;
    constructor(prismaSerivce: PrismaService, jwtService: JwtService);
    doSomethingWithToken(token: string): Promise<any>;
    getCartItems(userId: number, req: Request, res: Response): Promise<{
        carts: (import(".prisma/client").Cart & {
            product: import(".prisma/client").Product;
            user: import(".prisma/client").User;
        })[];
        categories: import(".prisma/client").Category[];
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    addToCart(userId: number, productId: number, quantity: number, req: Request, res: Response): Promise<void>;
    remove(id: number, req: Request, res: Response): Promise<void>;
}
