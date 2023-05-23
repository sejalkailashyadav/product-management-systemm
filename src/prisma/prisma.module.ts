<<<<<<< HEAD
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
=======
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

>>>>>>> dev
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
