import { Controller, Get, Post, Body, Patch, Param, Delete,Render ,Response,Request} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Public } from 'src/common/decorators';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Public()
  // @Get("/product_category")
  // @Render("product")
  // async userPanel(@Request() req, @Response() res) {
  //   try {
  //     const users = await this.categoriesService.getAllUser();
  //     return { users };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Public()
  // @Get("/getallcetgeory")
  // @Render("Category_add")
  // async userPanel() {
  //   try {
  //    await this.categoriesService.getAllUser();
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  @Public()
  @Get("/getallcetgeory")
  @Render("Category_add")
  async getAllCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return { categories }; 
  }
 
  //create caregory
  @Public()
  @Post("/craeate-categories")
  createnewcategory(@Body() dto: CreateCategoryDto) {
    try {
      return this.categoriesService.createcategory(dto);
    } catch (error) {
      throw error;
    }
  }
  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
