  import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from "path";
import { cwd } from 'process';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appp = express();
  appp.set("view engine", "ejs");
  appp.set("views", path.join(__dirname, "views"));
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine("ejs");
  app.enableCors();
  const cwd = process.cwd();
  app.useStaticAssets(cwd + "/public");
  app.use(cookieParser());
  app.use(express.static("public"));
  //  console.log(path.join(__dirname,"../../uploads/"));
  //  console.log(cwd);
    console.log(cwd + '/public');

  await app.listen(8000);
}
bootstrap();
