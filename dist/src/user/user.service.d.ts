import { CreateUserDto } from "./dto/create-user.dto";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { Tokens } from "../auth/types";
export declare class UserService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    create(dto: CreateUserDto, req: Request, res: Response): Promise<Tokens>;
    refreshTokens(userId: number, rt: string): Promise<Tokens>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, email: string): Promise<Tokens>;
    getAllUser(): Promise<{
        name: string;
        email: string;
        id: number;
    }[]>;
    deleteUserById(id: number, req: Request, res: Response): Promise<void>;
    editUserById(id: number, dto: CreateUserDto, req: Request, res: Response): Promise<void>;
}
