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
  Req,
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
import { Cart } from '@prisma/client';
@Controller("Product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoriesService: CategoriesService
  ) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Public()
  @Get("/user_product")
  @Render("user_home_page")
  userProductPage(@Req() req, @Res() res) {
    return this.productService.usersAllProducts(req, res);
  }

  @Public()
  @Get("/cart/:id")
  @Render("product_Details")
  showProductInCart(@Param("id") id: number, @Req() req, @Res() res) {
    return this.productService.findProductById(Number(id), req, res);
  }

  @Public()
  @Get("/product_details")
  @Render("product_Details")
  productDetailPage(@Req() req, @Res() res) {}

  @Get()

  // @Render('create_product')
  productData() {
    console.log("psss");

    return this.productService.findAllProducts();
  }
  @Get("/product_by_cat/:category_name")
  @Render("user_home_page")
  async productByCategory(
    @Param("category_name") category_name: string,
    @Res() res,
    @Req() req
  ) {
    const products = await this.productService.productByCategory(
      category_name,
      res,
      req
    );
    return { products: products };
  }

  @Public()
  @Get("product/edit/:id")
  // @Render('product_Details')
  findProduct(@Param("id") id: number) {
    console.log("inside get product");

    return this.productService.findProduct(id);
  }

  @Public()
  @Get("product/:id")
  @Render("product_Details")
  async findClickedProduct(@Param("id") id: number, @Req() req, @Res() res) {
    console.log("inside get product by id");

    return await this.productService.findProductById(Number(id), req, res);
  }

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

    return res.redirect("/product_add");
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

  // @Public()
  // @Get("/products")
  // @Render("product_add")
  // async userPanel() {
  //   try {
  //     const products = await this.productService.getAllprodcut();
  //     const categories = await this.categoriesService.getAllCategories();
  //     return { products, categories }; // Pass the products data to the view
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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

  //category-product for dmin-panle
  @Public()
  @Get("/all")
  @Render("product")
  async adminPanel() {
    try {
      const products = await this.productService.getAllprodcut();
      const categories = await this.categoriesService.getAllCategories();
      console.log(products, categories);
      return { products: products, categories: categories };
      // Pass the products data to the view
    } catch (error) {
      throw error;
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }
  //delete category-product
  @Public()
  @Delete("/delete/:id")
  async deleteproduct_category(@Param("id") id: number) {
    await this.productService.deleteproductById(+id);
    return { message: "product& category deleted successfully" };
  }

  @Public()
  @Patch("/edit/:id")
  async editUser(
    @Param("id") id: number,
    @Body("product_name") product_name: string,
    @Body("product_description") product_description: string,
    @Body("product_price") product_price: string,
    @Request() req
  ) {
    const updatedUser = await this.productService.editUserById(
      Number(id),
      product_name,
      product_description,
      product_price,
      req
    );
    return { user: updatedUser };
  }

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
