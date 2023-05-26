import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(req: any, res: any): Promise<void>;
    deleteproduct_category(id: number, dto: CreateProductDto, req: any, res: any): Promise<void>;
    createPost(dto: CreateProductDto, req: any, res: any, file: any): Promise<import(".prisma/client").Product>;
}
