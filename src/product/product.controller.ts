import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseInterceptors,
  UploadedFile,
  Res,
  Request,
  Response,
} from "@nestjs/common";
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { diskStorage } from "multer";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { GetCurrentUserId, Public } from "src/common/decorators";
import { Express } from "express";
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { get, request } from "http";
import { extname } from "path";
import { CartService } from "src/cart/cart.service";
import { Cart } from '@prisma/client';
@Controller("/Product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoriesService: CategoriesService,
    private readonly cartService: CartService,

  ) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }






  @Public()
  @Post("products/:categoryId")
  // @UseInterceptors(
  //   FileInterceptor("product_image", {
  //     storage: diskStorage({
  //       destination: "./public",
  //       filename(req, file, callback) {
  //         callback(null, `${file.originalname}`);
  //       },
  //     }),
  //   })
  // )
  @Public()
  createPost(
    @Param("categoryId") categoryId: number,
    @Body() dto: CreateProductDto,
    @Request() req,
    @Response() res
  ) {
    return this.productService.setprodct_category(
      Number(categoryId),
      dto,
      req,
      res
    );

    return res.redirect('/product_add');
  }

  // @Post(':categoryId/products')
  // @UseInterceptors(FileInterceptor('product_image', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, callback) => {
  //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       const extension = extname(file.originalname);
  //       callback(null, file.fieldname + '-' + uniqueSuffix + extension);
  //     },
  //   }),
  // }))
  // async addProductToCategory(
  //   @Param('categoryId') categoryId: number,
  //   @Body() productData: CreateProductDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   try {
  //   const product = await this.productService.addProduct(categoryId, productData, product_image);

  //     return { message: 'Product added successfully', product };
  //   } catch (error) {
  //     throw new Error('Failed to add product');
  //   }
  // }

  @Public()
  @Get("/products")
  @Render("product_add")
  async userPanel() {
    try {
      const products = await this.productService.getAllprodcut();
      const categories = await this.categoriesService.getAllCategories();
      return { products, categories }; // Pass the products data to the view
    } catch (error) {
      throw error;
    }
  }

  // @Public()
  // @Get('/Home')
  // @Render("prodcut_categorye")
  // async userPanell() {
  //   try {
  //     const products = await this.productService.getAllprodcut();
  //     const categories = await this.categoriesService.getAllCategories();
  //     const cart = {};
  //     return { products,categories,cart}; // Pass the products data to the view
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }
  //delete  user by id
  @Public()
  @Post("/delete/:id")
  async deleteproduct_category(
    @Param("id") id: number,
    @Body() dto: CreateProductDto,
    @Request() req,
    @Response() res
  ) {
    return this.productService.deleteproductById(Number(id), dto, res, req);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

//   @Public()
//   @Post(':id/add-to-cart') 
//   async addToCartt(
//   @GetCurrentUserId() userId: number,
//   @Request() req,
//   @Body('quantity') quantity: number,
//     @Param('id') id: number,
  
//   ) {
    
//    console.log(userId);
   
//   //const { user } = request.;
//   // const userId = user.id;
//   return this.cartService.addToCart(userId, id, quantity);


// }

  
}
