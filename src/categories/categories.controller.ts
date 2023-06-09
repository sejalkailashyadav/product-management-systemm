import { Controller, Get, Post, Body, Param, Delete, Render, Res, Req ,Response,Request} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Public } from 'src/common/decorators';

@Public()
@Controller('Category')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly prismaService: PrismaService
  ) {}

  @Public()
  @Get('/Categories')
  @Render('Category_add')
  async getAllCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return { categories };
  }

  @Public()
  @Post('/create-categories')
  async createCategory(@Body() dto: CreateCategoryDto, @Res() res) {
    const createdCategory = await this.categoriesService.createCategory(dto);
    const categories = await this.categoriesService.getAllCategories();
    return res.render('Category_add', { categories });
  }

  @Public()
  @Post("/edit/:id")
  async editUser(
    @Param("id") id: number,
    @Body() dto: CreateCategoryDto,
    @Request() req,
    @Response() res
  ) {
    return this.categoriesService.editcategoryById(Number(id), dto, res, req);
  }

  @Public()
  @Post('/delete/:id')
  async deleteCategory(@Param('id') id: number, @Res() res) {
    await this.categoriesService.deleteCategory(id);
    const categories = await this.categoriesService.getAllCategories();
    return res.render('Category_add', { categories });
  }
}