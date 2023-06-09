import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from "@nestjs/common";
import { RolPermissionService } from './rol-permission.service';
import { CreateRolPermissionDto } from './dto/create-rol-permission.dto';
import { UpdateRolPermissionDto } from './dto/update-rol-permission.dto';
import { Public } from "src/common/decorators";
@Controller()
export class RolPermissionController {
  constructor(private readonly rolPermissionService: RolPermissionService) {}

  // @Post()
  // create(@Body() createRolPermissionDto: CreateRolPermissionDto) {
  //   return this.rolPermissionService.create(createRolPermissionDto);
  // }
  //get all roles
  @Public()
  @Render("role")
  @Get("role")
  async findAllroles() {
    const users = await this.rolPermissionService.findAllroles();
    // console.log(users);

    return { users: users };
  }

  //get allpermission
  @Public()
  @Render("permission")
  @Get("permission")
  async findAllPermission() {
    const users = await this.rolPermissionService.findAllPermission();
    // console.log(users);
    return { users: users };
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolPermissionService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRolPermissionDto: UpdateRolPermissionDto
  ) {
    return this.rolPermissionService.update(+id, updateRolPermissionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolPermissionService.remove(+id);
  }
}
