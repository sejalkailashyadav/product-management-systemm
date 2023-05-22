import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from "src/prisma/prisma.service";
export declare class ProductService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    create(createProductDto: CreateProductDto): string;
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
