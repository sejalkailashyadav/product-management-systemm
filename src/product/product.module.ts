import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
<<<<<<< HEAD
import { PrismaModule } from '../prisma/prisma.module';

=======
import { ProductService } from './product.service';
import { CategoriesService } from '../categories/categories.service'; // Import CategoriesService
import { CategoriesController } from '../categories/categories.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
@Module({
  controllers: [ProductController, CategoriesController],
  providers: [ProductService, CategoriesService],
  imports: [
    PrismaModule,
    ProductModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: "buybuihbikhkhk",
        signOptions: { expiresIn: "15m" },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ProductModule {}
