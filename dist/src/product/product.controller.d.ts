import { ProductService } from "../product/product.service";
interface FileParams {
    fileName: string;
}
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(req: any, res: any): Promise<{
        users: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    signup(): {
        msg: string;
    };
    upadetcatgo_prod(): Promise<void>;
    createPost(): Promise<import(".prisma/client").Product>;
    uploadFile(file: any): Promise<string>;
    getFile(res: any, file: FileParams): void;
}
export {};
