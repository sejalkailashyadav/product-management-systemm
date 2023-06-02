import { Controller, Get, Post, Body, Patch, Param, Delete,Req, Res,Render  } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from '../cart/dto/create-cart.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorators';
import { ProductService } from 'src/product/product.service';
import { CategoriesService } from 'src/categories/categories.service';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly categoriesService: CategoriesService,
  ) { }

  @Post()
  create(@Body() createCartDto: AddToCartDto) {
    return this.cartService.create(createCartDto);
  }
  // @Public()
  // @Get('/')
  // @Render("prodcut_categorye")
  // async userPanell() {
  //   try {
  //     const products = await this.productService.getAllprodcut();
  //     const categories = await this.categoriesService.getAllCategories();
  //     const cart = {};
  //     return {products,categories,cart}; // Pass the products data to the view
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
  //working
  // @Public()
  // @Post('add')
  // async addToCart(@Body() addToCartDto: AddToCartDto, @Req() request: Request) {
  //   const { productId, quantity } = addToCartDto;
  //   const sessionId = request.cookies['sid']; // Assuming the session ID is stored in the 'sid' cookie

  //   await this.cartService.addToCart(sessionId, productId, quantity);
  //   // Handle the response or return any data if needed
  // }
  @Public()
  @Post('add')
  async addToCart(@Body() data: any, @Req() req, @Res() res: Response) {
    try {
      const { productId, quantity } = data;

      const userId = req.user.id; // Assuming you have implemented authentication and user identification

      await this.cartService.addToCart(userId, productId, quantity);

      return res.redirect('/cart'); // Redirect to the cart page after adding the item
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}