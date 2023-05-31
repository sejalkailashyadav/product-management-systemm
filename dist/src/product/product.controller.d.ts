import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { CategoriesService } from '../categories/categories.service';
export declare class ProductController {
    private readonly productService;
    private readonly categoriesService;
    constructor(productService: ProductService, categoriesService: CategoriesService);
    createPost(categoryId: number, dto: CreateProductDto, req: any, res: any): Promise<import(".prisma/client").Product>;
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
    }>;
    findOne(id: string): string;
    deleteproduct_category(id: number, dto: CreateProductDto, req: any, res: any): Promise<void>;
    remove(id: string): string;
}
