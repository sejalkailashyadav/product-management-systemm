import { Injectable,Req, Res  } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
@Injectable()
export class ProductService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  // createPost(poductDto: CreateProductDto) {
  //   return this.prismaSerivce.post.create({
  //      category_name: poductDto.category_name,
  //     },
  //   });
  // }

  // async updatedata(
  //   dto: CreateProductDto,
  //   req: Request,
  //   res: Response
  // ) {
  //   await this.prismaSerivce.product.update({
  //     where: { id: 1 },
  //     data: {
  //       product_name: dto.product_name,
  //       product_description: dto.product_description,
  //       product_price: dto.product_price,
  //       product_image: dto.product_image,
  //       catrgory: {
  //         set: [{ id: 1 }],
  //         create: [{ category_name: dto.category_name }],
  //       },
  //     },
  //   });
  // }
  //select
  async findAll(@Req() req: Request, @Res() res: Response) {
    const cate_product = await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
    res.render("user_Panel",  {cate_product });
    console.log(cate_product)
  }

  //select
  // async uploadimages() {
  //   return await this.prismaSerivce.product.uploadSingle({
  //     include: { catrgory: true },
  //   });
  // }
  //update

  //update user
  async deleteUserById(
    id: number,
    dto: CreateProductDto,
    req: Request,
    res: Response
  ) {
    await this.prismaSerivce.product.delete({
      where: {
        id: id,
      },
    });
  }

  ///insert prodcu data with category -multer
  async setprodct_category(
    dto: CreateProductDto,
    req: Request,
    res: Response,
    file: any
  ) {
    return await this.prismaSerivce.product.create({
      data: {
        product_name: dto.product_name,
        product_description: dto.product_description,
        product_price: dto.product_price,
        product_image: dto.product_image,

        catrgory: {
          create: [{ category_name: dto.category_name }],
        },
      },
    });
  }
}
