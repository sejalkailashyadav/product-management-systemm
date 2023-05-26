import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  // createPost(poductDto: CreateProductDto) {
  //   return this.prismaSerivce.post.create({
  //     data: {
  //       category_name: poductDto.category_name,
  //     },
  //   });
  // }

  async updatedata() {
    await this.prismaSerivce.product.update({
      where: { id: 12 },
      data: {
        product_name: "phone",
        product_description: "Lorem ipsum dolor sit amet consectetur",
        product_price: "10000",
        product_image: "image.png",
        catrgory: {
          set: [{ id: 11 }, { id: 12 }],
          create: { category_name: "telephone" },
        },
      },
    });
  }
  //select
  async findAll() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
  }

  //select
  // async uploadimages() {
  //   return await this.prismaSerivce.product.uploadSingle({
  //     include: { catrgory: true },
  //   });
  // }

  ///insert
  async setprodct_category() {
    return await this.prismaSerivce.product.create({
      data: {
        product_name: "phone",
        product_description: "Lorem ipsum dolor sit amet consectetur",
        product_price: "10000",
        product_image: "image.png",

        catrgory: {
          create: [
            { category_name: "electronics" },
            { category_name: "communication_device" },
          ],
        },
      },
    });
  }
}
