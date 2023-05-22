import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from "../product/product.service";
import { Public } from 'src/common/decorators';

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Public()
  // @Post("/create-poduct")
  // createPost(@Body() productDto: CreateProductDto) {
  //   return this.productService.createPost(productDto);
  // }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }
  @Public()
  @Get('/all')
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
