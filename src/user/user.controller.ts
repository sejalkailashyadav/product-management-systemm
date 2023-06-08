import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Res,
  Request,
  Req
} from "@nestjs/common";
<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
=======
import { Response } from "express";
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Public } from "../common/decorators";
import { CategoriesService } from "src/categories/categories.service";

<<<<<<< HEAD
@Controller("/")
export class UserController {
  constructor(private readonly userService: UserService) { }
=======
@Public()
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService,private readonly categoriesService: CategoriesService) {}
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

  @Public()
<<<<<<< HEAD
  @Get('/')
  @Render('user-panel')
  async userPanelll() { }

  @Public()
  @Get('/users')
  async userPanel(@Request() req, @Response() res) {
    return this.userService.getAllUser(req, res);
  }
  @Public()
  @Get('/admin-panel')
  @Render('admin_panel')
  async adminPanel() { }

  @Public()
  @Post('/insert')
  insertuser(
    @Body() dto: CreateUserDto,
    @Request() req,
    @Response() res,
  ): Promise<Tokens> {
    return this.userService.create(dto, req, res);
=======
  @Get("/users")
  @Render("user-panel")
  async userPanel() {
    const users = await this.userService.getAllUser();
    return { users };
  }

  @Public()
  @Post("/insert")
  async insertUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    await this.userService.createUser(dto);
    return res.redirect("/user/users"); // Redirect to the user panel after adding a user
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
  }

  @Public()
<<<<<<< HEAD
  @Post('/delete/:id')
  async deleteUserById(
    @Param('id') id: number,
    @Request() req,
    @Response() res,
  ) {
    return this.userService.deleteUserById(Number(id), res, req); // Convert the id to a number if necessary
=======
  @Delete("delete/:id")
  async deleteUserById(@Param("id") id: number) {
    await this.userService.deleteUserById(+id); // Convert the id to a number if necessary
    return { message: "User deleted successfully" };
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
  }

  @Public()
  @Post('/edit/:id')
  async editUser(
    @Param('id') id: number,
    @Body() dto: CreateUserDto,
    @Request() req,
<<<<<<< HEAD
    @Response() res,
=======
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
  ) {
    const updatedUser = await this.userService.editUserById(
      Number(id),
      dto,
      req,
    );
    return { user: updatedUser };
  }
  @Get('user_home')
  @Render('users_panel')
  getUserPanel(@Req() req, @Res() res){
    return this.categoriesService.findAllCategory(req, res);
  
  }

}
