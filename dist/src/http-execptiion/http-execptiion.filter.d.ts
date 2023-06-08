import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
export declare class HttpExecptiionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
