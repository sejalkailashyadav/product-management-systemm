import { ProductService } from "../product/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(req: any, res: any): Promise<{
        users: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    upadetcatgo_prod(): Promise<void>;
    createPost(): Promise<import(".prisma/client").Product>;
}
