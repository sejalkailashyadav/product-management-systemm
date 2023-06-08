<<<<<<< HEAD
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Tokens } from '../auth/types';
export declare class UserService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    create(dto: CreateUserDto, req: Request, res: Response): Promise<Tokens>;
    refreshTokens(userId: number, rt: string): Promise<Tokens>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, email: string): Promise<Tokens>;
    getAllUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(): Promise<{
        name: string;
        email: string;
        id: number;
=======
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from "express";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUser(): Promise<{
        id: number;
        name: string;
        email: string;
        isadmin: boolean;
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
    }[]>;
    createUser(dto: CreateUserDto): Promise<void>;
    deleteUserById(id: number): Promise<void>;
    editUserById(id: number, dto: CreateUserDto, req: Request): Promise<import(".prisma/client").User>;
    private convertToBoolean;
}
