import { Injectable } from '@nestjs/common';
import { CreateRolPermissionDto } from './dto/create-rol-permission.dto';
import { UpdateRolPermissionDto } from './dto/update-rol-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolPermissionService {
  constructor(private prisma: PrismaService) {}

  async findAllroles() {
    return await this.prisma.user.findMany({
     select: { id: true, email: true, name: true, isadmin: true },
     where: { isadmin: false },
   });
  }

  async findAllPermission() {
  return  await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, isadmin: true },
      where: { isadmin: false },
    });
  }
  findOne(id: number) {
    return `This action returns a #${id} rolPermission`;
  }

  update(id: number, updateRolPermissionDto: UpdateRolPermissionDto) {
    return `This action updates a #${id} rolPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolPermission`;
  }
}
