import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Request,
  Response,
  HttpStatus,
  Res,
  Query,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Public } from "src/common/decorators";

@Public()
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get("/users")
  @Render("user-panel")
  async userPanel() {
  const users =await this.userService.getAllUser();
    return {users}
  }

  // @Public()
  // @Get("/admin-panel")
  // @Render("admin_panel")
  // async adminPanel() {}

  @Public()
  @Post("/insert")
  insertuser(
    @Body() dto: CreateUserDto,
    @Request() req,
    @Response() res
  ) {
    return this.userService.create(dto, req, res);
  }

  // @Public()
  // @Get('/select')
  // getAllUser(@Request() req, @Response() res) {
  //   return this.userService.getAllUser(req, res);
  // }

  @Public()
  @Post("/delete/:id")
  async deleteUserById(
    @Param("id") id: number,
    @Request() req,
    @Response() res
  ) {
    return this.userService.deleteUserById(Number(id), res, req); // Convert the id to a number if necessary
  }

  @Public()
  @Post("/edit/:id")
  async editUser(
    @Param("id") id: number,
    @Body() dto: CreateUserDto,
    @Request() req,
    @Response() res
  ) {
    return this.userService.editUserById(Number(id), dto, res, req);
  }
}
