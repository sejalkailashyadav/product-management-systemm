import { ProductService } from "../product/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    findOne(id: string): string;
    remove(id: string): string;
}
