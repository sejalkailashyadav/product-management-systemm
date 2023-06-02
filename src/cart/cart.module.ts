// cart.module.ts
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import the PrismaModule
import { ProductService } from 'src/product/product.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [PrismaModule], // Import the PrismaModule
  controllers: [CartController],
  providers: [CartService,ProductService,CategoriesService],
})
export class CartModule {}
