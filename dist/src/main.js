"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
<<<<<<< HEAD
const cookieParser = require("cookie-parser");
=======
const express = require("express");
const cookieParser = require("cookie-parser");
const http_execptiion_filter_1 = require("./http-execptiion/http-execptiion.filter");
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_execptiion_filter_1.HttpExecptiionFilter);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setViewEngine('ejs');
    app.enableCors();
    const cwd = process.cwd();
<<<<<<< HEAD
    app.useStaticAssets(cwd + '/public');
    app.use(cookieParser());
    console.log(cwd + '/public');
    await app.listen(1111);
=======
    app.useStaticAssets(cwd + "");
    app.use(cookieParser());
    app.use(express.static("public"));
    await app.listen(7000);
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
}
bootstrap();
//# sourceMappingURL=main.js.map