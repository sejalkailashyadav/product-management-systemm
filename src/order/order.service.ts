import { Injectable, ForbiddenException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(){
   const user = await this.prisma.order.create({
  data: {
    price:"10",
    quantity:"1",
    product_id: 1,
    user_id:1,
  },
  })
  .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });
      }
    }

  //     .catch((error) => {
  //       if (error instanceof PrismaClientKnownRequestError) {
  //         if (error.code === "P2002") {
  //           throw new ForbiddenException("Credentials incorrect");
  //         }
  //       }
  //       throw error;
        
  //     });
  // //  res.redirect("/order/all");
  //  return user;
  // }
  // findAll() {
  //   return `This action returns all order`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} order`;
  // }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
