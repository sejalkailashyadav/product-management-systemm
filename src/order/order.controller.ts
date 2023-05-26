import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Request,
  Response,
} from "@nestjs/common";
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public, GetCurrentUserId, GetCurrentUser } from "../common/decorators";

@Controller("user-order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Public()
  @Get("/user_panel")
  @Render("user_Panel")
  async user_Panel(@Request() req, @Response() res) {
    try {
      // const users = await this.orderService.getAllUser();
      return { msg: "users" };
    } catch (error) {
      throw error;
    }
  }
      @Public()
  @Get("/product")
   @Render("product")
  async findAll() {
     return await this.orderService.findAll();
   
  }
  @Public()
  @Get("/order")
  @Render("order")
  async user_order(@Request() req, @Response() res) {
    try {
      // const users = await this.orderService.getAllUser();
      return { msg: "order" };
    } catch (error) {
      throw error;
    }
  }
  @Public()
  @Get("/cart")
  @Render("cart")
  async user_cart(@Request() req, @Response() res) {
    try {
      // const users = await this.orderService.getAllUser();
      return { msg: "cart" };
    } catch (error) {
      throw error;
    }
  }

  // order-cart-product-cate
  @Public()
  @Post("/insert")
  insertuser() {
    return this.orderService.create();
  }

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.orderService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return this.orderService.update(+id, updateOrderDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.orderService.remove(+id);
  // }
}
