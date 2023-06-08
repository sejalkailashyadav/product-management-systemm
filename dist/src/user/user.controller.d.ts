<<<<<<< HEAD
/// <reference types="express" />
=======
import { Response } from "express";
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CategoriesService } from "src/categories/categories.service";
export declare class UserController {
    private readonly userService;
<<<<<<< HEAD
    constructor(userService: UserService);
    userPanelll(): Promise<void>;
    userPanel(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    adminPanel(): Promise<void>;
    insertuser(dto: CreateUserDto, req: any, res: any): Promise<Tokens>;
    deleteUserById(id: number, req: any, res: any): Promise<void>;
    editUser(id: number, dto: CreateUserDto, req: any, res: any): Promise<void>;
=======
    private readonly categoriesService;
    constructor(userService: UserService, categoriesService: CategoriesService);
    userPanel(): Promise<{
        users: {
            id: number;
            name: string;
            email: string;
            isadmin: boolean;
        }[];
    }>;
    insertUser(dto: CreateUserDto, res: Response): Promise<void>;
    deleteUserById(id: number): Promise<{
        message: string;
    }>;
    editUser(id: number, dto: CreateUserDto, req: any): Promise<{
        user: import(".prisma/client").User;
    }>;
    getUserPanel(req: any, res: any): Promise<{
        categories: import(".prisma/client").Category[];
    }>;
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
}
