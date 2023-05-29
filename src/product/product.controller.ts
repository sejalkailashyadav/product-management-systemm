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
import { FileInterceptor } from "@nestjs/platform-express";
import { get } from "http";
import * as path from "path";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Post("/create-poduct")
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

  
  // createPost(
  //   @Body() dto: CreateProductDto,
  //   @Request() req,
  //   @Response() res,
  //   @UploadedFile() file: any
  // ) {
  //   return this.productService.setprodct_category(dto, req, res, file);
  // }

  @Get()
  findAll() {
    return this.productService.findAll();
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
