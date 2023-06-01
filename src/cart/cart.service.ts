import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Public, GetCurrentUserId, GetCurrentUser } from "../common/decorators";
@Injectable()
export class CartService {
constructor(private readonly prismaSerivce: PrismaService) { }
  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
  async addToCart(userId: number, productId: number, quantity: number) {
    const cartItem = await this.prismaSerivce.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    if (cartItem) {
      // Update the quantity of the existing cart item
      await this.prismaSerivce.cart.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + quantity,
        },
      });
    } else {
      // Create a new cart item
      await this.prismaSerivce.cart.create({
        data: {
          user_id: userId,
          product_id: productId,
          quantity,
        },
      });
    }
  }
}
