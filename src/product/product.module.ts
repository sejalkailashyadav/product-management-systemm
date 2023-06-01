import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoriesService } from '../categories/categories.service'; // Import CategoriesService
import { CategoriesController } from '../categories/categories.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { CartModule } from "../cart/cart.module";
import { CartService } from "../cart/cart.service";
import { CartController } from 'src/cart/cart.controller';
@Module({
  controllers: [ProductController,CategoriesController,CartController],
  providers: [ProductService, CategoriesService,CartService], 
  imports: [PrismaModule,CartModule,ProductModule],
})
export class ProductModule {}
