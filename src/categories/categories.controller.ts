import { Controller, Get, Post, Body, Patch, Param, Delete,Render ,Response,Request} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Public } from 'src/common/decorators';

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get('/catgory')
  @Render('catgory')
  async userPanel(@Request() req, @Response() res) {
    try {
      const users = await this.categoriesService.getAllUser();
      return { users };
    } catch (error) {
      throw error;
    }
  }
  @Post("/craeate-categories")
  createnewUser(@Body() dto: CreateCategoryDto) {
    try {
      return this.categoriesService.createUser(dto);
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
