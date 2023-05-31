import { PrismaService } from "../prisma/prisma.service";
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(): Promise<import(".prisma/client").Order>;
    getAllUser(): Promise<{
        id: number;
        name: string;
        email: string;
    }[]>;
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
}
