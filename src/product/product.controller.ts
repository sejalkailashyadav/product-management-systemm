import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Response,
  Request,
  UseInterceptors,
  UploadedFile,
  Res,
} from "@nestjs/common";
import { diskStorage } from "multer";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { Public } from "src/common/decorators";
import { Express} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import { get } from "http";
import * as path from "path";

interface FileParams {
  fileName : string;
}

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get("/product")
  @Render("product")
  async findAll(@Request() req, @Response() res) {
    const users = await this.productService.findAll();
    return { users };
  }

  //delete
  @Public()
  @Get("data")
  @Render("products") // Specify the EJS template file to render
  signup() {
    // Your logic to retrieve data and pass it to the template
    return { msg: "sejal" };
  }
  //update
  @Public()
  @Post("/create-poduct-update")
  upadetcatgo_prod() {
    return this.productService.updatedata();
  }

  //insert
  @Public()
  @Post("/create-poduct")
  createPost() {
    return this.productService.setprodct_category();
  }

  //insert
  @Public()
  @Post("/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./public",
        filename(req, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    })
  )
  async uploadFile(@UploadedFile() file: any) {
    console.log(file);

    return "scucess";
  }

  // @Public()
  // @Get("/getFile")
  // getFile(@Res() res, @Body() file: FileParams) {
  //   res.sendFile(__dirname, "./public/" + file.fileName);
  // }
}
//get all prodcut can have multiple category
//   @Public()
//   @Get("/all")
//   findAll() {
//     return this.productService.findAll();
//   }
// }
