  import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import { cwd } from 'process';
import * as cookieParser from 'cookie-parser';
<<<<<<< HEAD
=======
import { HttpExecptiionFilter } from './http-execptiion/http-execptiion.filter';

>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
app.useGlobalFilters(new HttpExecptiionFilter)
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('ejs');
  app.enableCors();
  const cwd = process.cwd();
<<<<<<< HEAD
  app.useStaticAssets(cwd + '/public');
  app.use(cookieParser());
  //  console.log(path.join(__dirname,"../../uploads/"));
  //  console.log(cwd);
  console.log(cwd + '/public');
=======
  app.useStaticAssets(cwd + "");
  app.use(cookieParser());
  app.use(express.static("public"));
  //  console.log(path.join(__dirname,"../../uploads/"));
  //  console.log(cwd);
    //console.log(cwd + '/public');
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

  await app.listen(7000);
}
bootstrap();
