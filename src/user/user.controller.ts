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
import { Tokens } from "../auth/types";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Public()
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  // @Public()
  // @Get('/user/user-listing')
  // @Render('/user/user-listing')
  // async userPanell(@Request() req, @Response() res) {
  //   return { msg: 'sehal' };
  // }
  // @Public()
  // @Get("/user-panel")
  // @Render("user-panel")
  // async userPanel(@Request() req, @Response() res) {
  //   try {
  //     const users = await this.userService.getAllUser();
  //     return { users };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Public()
  @Get("/")
  @Render("user-panel")
  async userPanelll() {}

  @Public()
  @Get("/users")
  async userPanel(@Request() req, @Response() res) {
    return this.userService.getAllUser(req, res);
  }
  @Public()
  @Get("/admin-panel")
  @Render("admin_panel")
  async adminPanel() {}

  @Public()
  @Post("/insert")
  insertuser(
    @Body() dto: CreateUserDto,
    @Request() req,
    @Response() res
  ): Promise<Tokens> {
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
  @Post("/edit/userId")
  async editUser(
    @Query("userId") id: number,
    @Body() dto: CreateUserDto,
    @Request() req,
    @Response() res
  ) {
    return this.userService.editUserById(id, dto, res, req);
  }
}
