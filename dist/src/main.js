"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const cookieParser = require("cookie-parser");
const http_execptiion_filter_1 = require("./http-execptiion/http-execptiion.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_execptiion_filter_1.HttpExecptiionFilter);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setViewEngine("ejs");
    app.enableCors();
    const cwd = process.cwd();
    app.useStaticAssets(cwd + "/public");
    app.use(cookieParser());
    app.use(express.static("public"));
    console.log(cwd + '/public');
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map