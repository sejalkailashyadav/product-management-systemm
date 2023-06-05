import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";

@Catch()
export class HttpExecptiionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    host
      .switchToHttp()
      .getResponse()
      .status(exception.getStatus())
      .render("page_404");
  }
}
