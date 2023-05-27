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

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoriesModule,
<<<<<<< HEAD
    RolePermissionsModule,
    MulterModule.register({
      dest: "./files",
    }),
    OrderModule,
=======
>>>>>>> 7f6cf4b5a4092156894649a9cca8a0d9f9926e9a
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
