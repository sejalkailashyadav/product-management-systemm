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
  Response 
} from "@nestjs/common";
import { diskStorage } from "multer";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { Public } from "src/common/decorators";
import { Express} from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { get } from "http";
import * as path from "path";

interface FileParams {
  fileName: string;
}

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //get all product
  @Public()
  @Get("/product")
  async findAll(@Request() req, @Response() res) {
    return await this.productService.findAll(req, res);
  }
  //delete  user by id
  @Public()
  @Post("/deleet_pc/:id")
  async deleteproduct_category(
    @Param("id") id: number,
    @Body() dto: CreateProductDto,
    @Request() req,
    @Response() res
  ) {
    return this.productService.deleteUserById(Number(id), dto, res, req);
  }

  // delete
  // @Public()
  // @Post("/create-poduct-update")
  // upadetcatgo_prod(
  //   @Body() dto: CreateProductDto,
  //   @Request() req,
  //   @Response() res
  // ) {
  //   return this.productService.updatedata(dto, req, res);
  // }

  //insert porudct-category
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
  createPost(
    @Body() dto: CreateProductDto,
    @Request() req,
    @Response() res,
    @UploadedFile() file: any
  ) {
    return this.productService.setprodct_category(dto, req, res, file);
  }

  //get image
  // @Public()
  // @Get("/getFile")
  // getFile(@Res() res, @Body() file: FileParams) {
  //   res.sendFile(__dirname, "./public/" + file.fileName);
  // }
  //insert image
  // @Public()
  // @Post("/create-poduct/upload")
  // @UseInterceptors(
  //   FileInterceptor("file", {
  //     storage: diskStorage({
  //       destination: "./public",
  //       filename(req, file, callback) {
  //         callback(null, `${file.originalname}`);
  //       },
  //     }),
  //   })
  // )
  // async uploadFile(@UploadedFile() file: any) {
  //   console.log(file);

  //   return "scucess";
}
