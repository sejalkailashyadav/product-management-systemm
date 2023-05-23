import { PrismaService } from "src/prisma/prisma.service";
export declare class ProductService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    updatedata(): Promise<void>;
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    setprodct_category(): Promise<import(".prisma/client").Product>;
}
