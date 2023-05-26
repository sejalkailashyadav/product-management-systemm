import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private transporter;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    forgotPassword(email: string, req: Request, res: Response): Promise<void>;
    resetPassword(email: string, token: string, newPassword: string, req: Request, res: Response): Promise<void>;
    private generateSecureToken;
    signupLocal(dto: AuthDto, req: Request, res: Response): Promise<Tokens>;
    getadminLogin(dto: AuthDto, req: Request, res: Response): Promise<Tokens>;
    signinLocal(dto: AuthDto, req: Request, res: Response): Promise<Tokens>;
    logout(userId: number, req: Request, res: Response): Promise<boolean>;
    refreshTokens(userId: number, rt: string): Promise<Tokens>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, email: string): Promise<Tokens>;
}
