import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '.prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
<<<<<<< HEAD
import { PrismaService } from 'src/prisma/prisma.service';
=======
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }
  async editcategoryById(
    id: number,
    dto: CreateCategoryDto,
    req: Request,
    res: Response
  ) {
    await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        category_name: dto.category_name,
      },
    });
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return this.prismaService.category.create({
      data: {
        category_name: dto.category_name,
      },
    });
  }

  async editUserById(id: number, dto: CreateCategoryDto, req: Request) {
    await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        category_name: dto.category_name,
      },
    });

    const updatedcategory = await this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });

    return updatedcategory;
  }



  async deleteCategory(id: number): Promise<void> {
    await this.prismaService.category.delete({
      where: {
        id: +id,
      },
    });
  }

<<<<<<< HEAD
  async getAllUser() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
=======

  async findAllCategory(req: Request, res: Response ) {
    const categories = await this.prismaService.category.findMany({
      // include:{
      //   products: true
      // }
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
    });
   // console.log("categories",categories);
    return {categories}
    
  }
<<<<<<< HEAD
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
=======
}
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
