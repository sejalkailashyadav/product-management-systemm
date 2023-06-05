import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
export declare class ProductService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    create(createProductDto: CreateProductDto): string;
    getAllprodcut(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    getAllCategories(): Promise<import(".prisma/client").Category[]>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
    setprodct_category(categoryId: number, dto: CreateProductDto, req: Request, res: Response): Promise<import(".prisma/client").Product>;
    deleteproductById(id: number, dto: CreateProductDto, req: Request, res: Response): Promise<void>;
    usersAllProducts(req: Request, res: Response): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    findProductById(id: number, req: Request, res: Response): Promise<{
        product: import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        };
    }>;
    findAllProducts(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    productByCategory(category_name: string, res: Response, req: Request): Promise<void>;
    findProduct(id: number): Promise<import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    }>;
}
