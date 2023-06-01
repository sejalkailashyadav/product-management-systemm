import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { CategoriesService } from '../categories/categories.service';
import { CartService } from "src/cart/cart.service";
export declare class ProductController {
    private readonly productService;
    private readonly categoriesService;
    private readonly cartService;
    constructor(productService: ProductService, categoriesService: CategoriesService, cartService: CartService);
    createPost(categoryId: number, dto: CreateProductDto, req: any, res: any): any;
    userPanel(): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
        categories: import(".prisma/client").Category[];
    }>;
    userPanell(): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
        categories: import(".prisma/client").Category[];
        cart: {};
    }>;
    findOne(id: string): string;
    deleteproduct_category(id: number, dto: CreateProductDto, req: any, res: any): Promise<void>;
    addToCartt(userId: number, req: any, quantity: number, id: number): Promise<void>;
}
