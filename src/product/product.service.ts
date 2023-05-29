import { Injectable,Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";

@Injectable()
export class ProductService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return "This action adds a new product";
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  ///insert prodcu data with category -multer
  // async setprodct_category(
  //   dto: CreateProductDto,
  //   req: Request,
  //   res: Response,
  //   file: any
  // ) {
  //   return await this.prismaSerivce.product.create({
  //     data: {
  //       product_name: dto.product_name,
  //       product_description: dto.product_description,
  //       product_price: dto.product_price,
  //       product_image: dto.product_image,

  //       catrgory: {
  //         create: [{ category_name: dto.category_name }],
  //       },
  //     },
  //   });
  // }
}
