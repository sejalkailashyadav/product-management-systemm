import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export the PrismaService to make it accessible in other modules
})
export class PrismaModule {}
