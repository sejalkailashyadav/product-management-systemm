import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoriesService } from '../categories/categories.service'; // Import CategoriesService
import { CategoriesController } from '../categories/categories.controller';
import { PrismaModule } from "../prisma/prisma.module";
@Module({
  controllers: [ProductController,CategoriesController],
  providers: [ProductService, CategoriesService], 
  imports: [PrismaModule],
})
export class ProductModule {}
