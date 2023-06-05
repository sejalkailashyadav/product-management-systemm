import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from "express";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  // const users = await this.prisma.user.findMany({
  //   select: { id: true, email: true, name: true, isadmin: true },
  //   where: { isadmin: false },
  // });


  async getAllUser() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, isadmin: true },
      where: { isadmin: false },
    });
  }

  async createUser(dto: CreateUserDto) {
    await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
      },
    });
  }

  async deleteUserById(id: number) {
    await this.prisma.user.delete({
      where: {
        id: +id,
      },
    });
  }

  async editUserById(id: number, dto: CreateUserDto, req: Request) {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        email: dto.email,
        isadmin: this.convertToBoolean(dto.isadmin),
      },
    });

    const updatedUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return updatedUser;
  }

  private convertToBoolean(value: string | boolean): boolean {
    if (typeof value === "string") {
      return value.toLowerCase() === "admin";
    }
    return Boolean(value);
  }
}
