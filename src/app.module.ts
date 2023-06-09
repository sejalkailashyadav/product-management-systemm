import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from "@nestjs/platform-express";
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { RolPermissionModule } from './rol-permission/rol-permission.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    MulterModule.register({
      dest: "./files",
    }),
    ProductModule,
    AdminModule,
    CartModule,
    OrdersModule,
    RolPermissionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
