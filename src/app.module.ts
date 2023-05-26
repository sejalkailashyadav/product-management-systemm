import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';
import { MulterModule } from "@nestjs/platform-express";
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoriesModule,
    RolePermissionsModule,
    MulterModule.register({
      dest: "./files",
    }),
    OrderModule,
    CartModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
