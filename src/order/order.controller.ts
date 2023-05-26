import { Controller, Get, Post, Body, Patch, Param, Delete,Request,Response } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Public, GetCurrentUserId, GetCurrentUser } from "../common/decorators";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
