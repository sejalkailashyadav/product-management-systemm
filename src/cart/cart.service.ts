import { Injectable } from "@nestjs/common";
import { AddToCartDto } from "../cart/dto/create-cart.dto";
import { PrismaService } from "../prisma/prisma.service";
import { GetCurrent } from "../common/decorators/decorators";
import { Public } from "../common/decorators/public.decorator";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class CartService {
  constructor(
    private readonly prismaSerivce: PrismaService,
    private jwtService: JwtService
  ) {}

  // async getAllCart() {
  //   return this.prismaSerivce.category.findMany();
  // }

  // async getCartItems(userId: number) {
  //   return this.prismaSerivce.cart.findMany({
  //     where: {
  //       user_id: userId,
  //     },
  //     include: {
  //       product: true,
  //     },
  //   });
  // }
  //get token try
  async doSomethingWithToken(token: string): Promise<any> {
    const decodedToken = await this.jwtService.verifyAsync(token);
    // Access the properties of the decoded token
    const userId = decodedToken.sub;
    const email = decodedToken.email;
    console.log(userId, email);

    // Perform actions based on the token data
    // ...
  }

  //get allitems
  async getCartItems(userId: number, req: Request, res: Response) {
    const carts = await this.prismaSerivce.cart.findMany({
      where: {
        user_id: userId,
      },
      include: {
        product: true,
        user: true,
      },
    });

    const products = await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });

    const categories = await this.prismaSerivce.category.findMany();

    console.log({ carts: carts, categories: categories, products: products });
    return { carts: carts, categories: categories, products: products };
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
    req: Request,
    res: Response
  ) {
    const existingCartItem = await this.prismaSerivce.cart.findFirst({
      where: {
        user_id: +userId,
        product_id: +productId,
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
          user: { connect: { id: +userId } },
          product: { connect: { id: +productId } },
          quantity: +quantity,
        },
      });
      //  res.redirect("/cart/cartpage");
    }
  }

  //remove item

  async remove(id: number, req: Request, res: Response) {
    await this.prismaSerivce.cart.delete({ where: { id: id } });
    // res.redirect('/cart/cart_page');
    // return `This action removes a #${id} cart`;
  }
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
