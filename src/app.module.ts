import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';
import { MulterModule } from "@nestjs/platform-express";
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    RolePermissionsModule,
    MulterModule.register({
      dest: "./files",
    }),
    OrderModule,
    ProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
