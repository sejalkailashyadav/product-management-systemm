import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
<<<<<<< HEAD
import { PrismaModule } from '../prisma/prisma.module';
=======
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';

>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService], 
})
export class CategoriesModule {}

