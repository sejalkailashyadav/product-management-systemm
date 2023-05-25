import { ProductService } from "../product/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
<<<<<<< HEAD
    signup(): {
        msg: string;
    };
=======
    findAll(req: any, res: any): Promise<{
        users: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
>>>>>>> 0f78aad526f4ac80a9d6205a04c9551710dbc894
    upadetcatgo_prod(): Promise<void>;
    createPost(): Promise<import(".prisma/client").Product>;
}
