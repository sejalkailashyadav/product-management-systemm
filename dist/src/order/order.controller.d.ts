import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    user_Panel(req: any, res: any): Promise<{
        msg: string;
    }>;
    findAll(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    user_order(req: any, res: any): Promise<{
        msg: string;
    }>;
    user_cart(req: any, res: any): Promise<{
        msg: string;
    }>;
    insertuser(): Promise<import(".prisma/client").Order>;
}
