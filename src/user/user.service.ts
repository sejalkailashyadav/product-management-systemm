import { Injectable, ForbiddenException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { JwtPayload, Tokens } from "../auth/types";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  //insert
  async create(
    dto: CreateUserDto,
    req: Request,
    res: Response,
  ): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user
      .create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'at-secrect',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'rt-secrect',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  async getAllUser(req: Request, res: Response) {
    const { draw, search, order } = req.query;
    // const offset = req.query.start || 0;
    // const limit = req.query.length || 10;

    // console.log('offset', typeof offset);

    const columns = ['id', 'name', 'email'];
    // const { dir, column } = order[0];
    // const columnOrder = columns[column];
    // const orderDirection = dir.toUpperCase();

    const query = {
      where: {},
      select: {
        id: true,
        name: true,
        email: true,
      },
      // offset: +offset,
      // limit: +limit,
      // order: [[columnOrder, orderDirection]],
    };

    // if (search.value) {
    //   query.where[Op.or] = columns.map((column) => ({
    //     [column]: { [Op.like]: `%${search.value}%` },
    //   }));
    // }

    const data = await this.prisma.user.findMany(query);

    return res.json({
      draw: draw,
      data: data,
    });
  }

  async findAll() {
    let users = await this.prisma.user.findMany({
      where: {},
      select: {
        password: false,
        updatedAt: false,
        createdAt: false,
        id: true,
        name: true,
        email: true,
      },
    });

    console.log(users, 'adminpanel user getdata');
    return users;
  }

  //delete user
  async deleteUserById(id: number, req: Request, res: Response) {
    await this.prisma.user.delete({
      where: {
        id: id, // Pass the id as a number directly
      },
    });
  }
  //update user
  async editUserById(
    id: number,
    dto: CreateUserDto,
    req: Request,
    res: Response,
  ) {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      },
    });
  }
}
