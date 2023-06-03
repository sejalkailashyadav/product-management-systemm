import { CartService } from "./cart.service";
import { ProductService } from "src/product/product.service";
import { CategoriesService } from "src/categories/categories.service";
import { JwtService } from "@nestjs/jwt";
export declare class CartController {
    private jwtService;
    private readonly cartService;
    private readonly productService;
    private readonly categoriesService;
    constructor(jwtService: JwtService, cartService: CartService, productService: ProductService, categoriesService: CategoriesService);
    findAll(req: any, res: any): Promise<{
        carts: (import(".prisma/client").Cart & {
            product: import(".prisma/client").Product;
            user: import(".prisma/client").User;
        })[];
        categories: import(".prisma/client").Category[];
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    addToCart(data: any, req: any, res: any, productId: number): Promise<any>;
    remove(id: number, req: any, res: any): Promise<void>;
}
