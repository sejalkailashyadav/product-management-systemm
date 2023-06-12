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
import { RolesModule } from './roles/roles.module';
import RolesGuard from './common/guards/roles.guard';
import PermissionsGuard from './common/guards/permissions.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [JwtModule,
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
    RolesModule,
  ],  controllers: [AppController],
  providers: [AppService,JwtService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },{
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    }
  ],
})
export class AppModule {}
