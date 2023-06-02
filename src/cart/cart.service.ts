import { Injectable } from '@nestjs/common';
import { AddToCartDto } from '../cart/dto/create-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import {  GetCurrent } from "../common/decorators/decorators";
import { Public } from "../common/decorators/public.decorator";
@Injectable()
export class CartService {
constructor(private readonly prismaSerivce: PrismaService) { }
  create(createCartDto: AddToCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
  //working
  // async addToCart(userId: number, productId: number, quantity: number) {
  //   const cartItem = await this.prismaSerivce.cart.findFirst({
  //     where: {
  //       user_id: 3,
  //       product_id: productId,
  //     },
  //   });


    
  //   if (cartItem) {
  //     // Update the quantity of the existing cart item
  //     await this.prismaSerivce.cart.update({
  //       where: {
  //         id: cartItem.id,
  //       },
  //       data: {
  //         quantity: cartItem.quantity + quantity,
  //       },
  //     });
  //   } else {
  //     // Create a new cart item
  //     await this.prismaSerivce.cart.create({
  //       data: {
  //         user: {
  //           connect: {
  //             id: 3, 
  //           },
  //         },
  //         product: {
  //           connect: {
  //             id: 4, // Replace `4` with the actual product ID
  //           },
  //         },
  //         quantity: 2,
  //       },
  //     });
      
  //   }
  // }
//
  
async addToCart(userId: number, productId: number, quantity: number) {
  const existingCartItem = await this.prismaSerivce.cart.findFirst({
    where: {
      user_id: userId,
      product_id: productId,
    },
  });

  if (existingCartItem) {
    // Update the existing cart item quantity
    await this.prismaSerivce.cart.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });
  } else {
    // Create a new cart item
    await this.prismaSerivce.cart.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        quantity: quantity,
      },
    });
  }
}
}
  
