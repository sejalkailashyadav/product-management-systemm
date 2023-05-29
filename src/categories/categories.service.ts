import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  async createcategory(dto: CreateCategoryDto) {
    return this.prismaSerivce.category.create({
      data: {
        category_name: dto.category_name,
      },
    });
  }

  

  async getAllUser() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
  }
  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  // async findAll(dto: CreateCategoryDto) {
  //   return await this.prismaSerivce.category.findMany({
  //     include: { tags: true },
  //   });
  // }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}


