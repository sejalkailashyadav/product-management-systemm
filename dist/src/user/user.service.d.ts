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
    }[]>;
    createUser(dto: CreateUserDto): Promise<void>;
    deleteUserById(id: number): Promise<void>;
    editUserById(id: number, dto: CreateUserDto, req: Request): Promise<import(".prisma/client").User>;
    private convertToBoolean;
}
