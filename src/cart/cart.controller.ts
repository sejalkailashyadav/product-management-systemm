import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Render, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/common/decorators';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Public()
  @Post('cart')
  async addToCart(@Body('productId') productId: number,@Body('quantity') quantity: number,@Body('total') total: number,@Req() req, @Res() res){
    return await this.cartService.addItemtoCart(productId,quantity,total,req,res);
  }

  @Public()
  @Post()
  create(@Body() createCartDto: CreateCartDto,@Req() req, @Res() res) {
    // const {productId, userId,quantity} = createCartDto;

    // const cart = await this.cartService.
    return this.cartService.create(createCartDto, req, res);
  }

  // @Get('product_detail')
  // @Render('product_Details')
  // getUserToAddProducts(){
  //   return this.cartService.get
  // }

  @Public()
  @Get('/cart_page')
  @Render('cart')
  getCartPage(@Req() req, @Res() res){
    return this.cartService.getAllCart(req, res );
  }
  @Public()
  @Get()
  findAll() {
    // return this.cartService.getAllCart();
    
  }



    
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: number,@Req() req, @Res() res) {
    return this.cartService.remove(id,req,res);
  }
}
