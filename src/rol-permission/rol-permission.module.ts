import { Module } from '@nestjs/common';
import { RolPermissionService } from './rol-permission.service';
import { RolPermissionController } from './rol-permission.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports :[PrismaModule],
  controllers: [RolPermissionController],
  providers: [RolPermissionService],
})
export class RolPermissionModule {}
