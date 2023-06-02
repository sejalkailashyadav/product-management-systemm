import { CartService } from "./cart.service";
import { AddToCartDto } from "../cart/dto/create-cart.dto";
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
export declare class CartController {
    private jwtService;
    private readonly cartService;
    constructor(jwtService: JwtService, cartService: CartService);
    create(createCartDto: AddToCartDto): string;
    get(req: any): Promise<any>;
    doSomethingWithToken(req: any, res: any): Promise<any>;
    findAll(req: any, res: Response): Promise<(import(".prisma/client").Cart & {
        product: import(".prisma/client").Product;
        user: import(".prisma/client").User;
    })[]>;
    addToCart(data: any, req: any, res: Response, productId: number): Promise<Response<any, Record<string, any>>>;
}
