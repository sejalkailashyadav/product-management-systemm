import { CartService } from './cart.service';
import { AddToCartDto } from '../cart/dto/create-cart.dto';
import { Response } from 'express';
import { ProductService } from 'src/product/product.service';
import { CategoriesService } from 'src/categories/categories.service';
export declare class CartController {
    private readonly cartService;
    private readonly productService;
    private readonly categoriesService;
    constructor(cartService: CartService, productService: ProductService, categoriesService: CategoriesService);
    create(createCartDto: AddToCartDto): string;
    findAll(): string;
    findOne(id: string): string;
    addToCart(data: any, req: any, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
