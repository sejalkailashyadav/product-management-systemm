import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { CategoriesService } from '../categories/categories.service';
export declare class ProductController {
    private readonly productService;
    private readonly categoriesService;
    constructor(productService: ProductService, categoriesService: CategoriesService);
    userProductPage(req: any, res: any): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    showProductInCart(id: number, req: any, res: any): Promise<{
        product: import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        };
    }>;
    productDetailPage(req: any, res: any): void;
    productData(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    productByCategory(category_name: string, res: any, req: any): Promise<{
        products: void;
    }>;
    findProduct(id: number): Promise<import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    }>;
    findClickedProduct(id: number, req: any, res: any): Promise<{
        product: import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        };
    }>;
    createPost(categoryId: number, dto: CreateProductDto, req: any, res: any): any;
    adminPanel(): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
        categories: import(".prisma/client").Category[];
    }>;
    findOne(id: string): string;
    deleteproduct_category(id: number): Promise<{
        message: string;
    }>;
    editUser(id: number, product_name: string, product_description: string, product_price: string, req: any): Promise<{
        user: void;
    }>;
}
