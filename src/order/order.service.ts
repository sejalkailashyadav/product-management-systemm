import { Injectable, ForbiddenException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "../auth/dto";
import { JwtPayload, Tokens } from "../auth/types";
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
  // //add to cart
  // async addtocart() {
  //   try {
  //     const users = await this.prisma.user.findMany({
  //       select: { id: true, email: true, name: true },
  //       where: { isadmin: false },
  //     });
  //     return users;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async addtocart(
  //   userId: number,
  //   rt: string,
  //   dto: CreateOrderDto,
  //   res: Response
  // ): Promise<void> {
  //   const hash = await argon.hash(rt);
  //   // console.log(hash);
  //   // console.log(userId);

  //    const order = await this.prisma.order.create({
  //      data: {
  //        items: [{ ...CreateOrderDto}],
  //      },
  //    });
     
  // }

  // await this.prisma.user.update({
  //   where: {
  //     id: userId,
  //   },
  //   data: {
  //     hashedRt: hash,
  //   },
  // });
}

