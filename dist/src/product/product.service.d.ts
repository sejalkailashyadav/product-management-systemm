import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
export declare class ProductService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    findAll(req: Request, res: Response): Promise<void>;
    deleteUserById(id: number, dto: CreateProductDto, req: Request, res: Response): Promise<void>;
    setprodct_category(dto: CreateProductDto, req: Request, res: Response, file: any): Promise<import(".prisma/client").Product>;
}
