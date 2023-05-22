import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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

  create(createProductDto: CreateProductDto) {
    return "This action adds a new product";
  }

  async findAll() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
