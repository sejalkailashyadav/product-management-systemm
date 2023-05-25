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
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { Public } from "src/common/decorators";

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
}
//get all prodcut can have multiple category
//   @Public()
//   @Get("/all")
//   findAll() {
//     return this.productService.findAll();
//   }
// }
