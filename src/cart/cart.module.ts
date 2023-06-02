// cart.module.ts
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from '../prisma/prisma.module'; // Import the PrismaModule
import { ProductService } from 'src/product/product.service';
import { CategoriesService } from 'src/categories/categories.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: "buybuihbikhkhk",
        signOptions: { expiresIn: "15m" },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ], // Import the PrismaModule
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
