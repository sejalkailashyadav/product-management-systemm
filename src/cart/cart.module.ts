import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from "../prisma/prisma.module";
@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [PrismaModule],
})
export class CartModule {}
