import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: "buybuihbikhkhk",
        signOptions: { expiresIn: "15m" },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    PrismaModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
