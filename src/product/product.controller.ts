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
import { diskStorage } from "multer";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { Public } from "src/common/decorators";
import { Express } from "express";
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { get } from "http";
import { extname } from "path";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService,private readonly categoriesService: CategoriesService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  @Public()
  @Post(":categoryId/products")
  @UseInterceptors(
    FileInterceptor("product_image", {
      storage: diskStorage({
        destination: "./public",
        filename(req, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    })
  )
  createPost(
    @Param("categoryId") categoryId: number,
    @Body() dto: CreateProductDto,
    @Request() req,
    @Response() res,
    @UploadedFile() file: any
  ) {
    return this.productService.setprodct_category(
      Number(categoryId),
      dto,
      req,
      res,
      file
    );
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
  @Get("/getallproduct")
  @Render("product_add")
  async userPanel() {
    try {
      const products = await this.productService.getAllprodcut();
      const categories = await this.categoriesService.getAllCategories();
      return { products,categories }; // Pass the products data to the view
    } catch (error) {
      throw error;
    }
  }
 
   @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
