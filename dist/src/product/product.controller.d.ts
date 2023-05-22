import { ProductService } from "../product/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    upadetcatgo_prod(): Promise<void>;
    createPost(): Promise<import(".prisma/client").Product>;
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
}
