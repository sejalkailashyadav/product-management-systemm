import { Injectable, ForbiddenException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create() {
    const user = await this.prisma.order
      .create({
        data: {
          price: "10",
          quantity: "1",
          product_id: 1,
          user_id: 1,
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
    return user;
  }
//all user
  async getAllUser() {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, email: true, name: true },
        where: { isadmin: false },
      });
      return users;
    } catch (err) {
      throw err;
    }
  }



  //product

  async findAll() {
    return await this.prisma.product.findMany({
      include: { catrgory: true },
    });
  }
}
