import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import { cwd } from 'process';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('ejs');
  app.enableCors();
  const cwd = process.cwd();
  app.useStaticAssets(cwd + '/public');
  app.use(cookieParser());
  //  console.log(path.join(__dirname,"../../uploads/"));
  //  console.log(cwd);
  console.log(cwd + '/public');

  await app.listen(1111);
}
bootstrap();
