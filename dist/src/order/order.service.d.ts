import { PrismaService } from "../prisma/prisma.service";
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(): Promise<import(".prisma/client").Order>;
    getAllUser(): Promise<{
        name: string;
        email: string;
        id: number;
    }[]>;
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
}
