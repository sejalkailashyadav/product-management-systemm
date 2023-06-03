import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
export declare class ProductService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    create(createProductDto: CreateProductDto): string;
    getAllprodcut(): Promise<void>;
    getAllCategories(): Promise<import(".prisma/client").Category[]>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
    setprodct_category(categoryId: number, dto: CreateProductDto, req: Request, res: Response): Promise<import(".prisma/client").Product>;
    deleteproductById(id: number, dto: CreateProductDto, req: Request, res: Response): Promise<void>;
}
