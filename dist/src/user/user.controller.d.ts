/// <reference types="express" />
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Tokens } from "../auth/types";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userPanelll(): Promise<void>;
    userPanel(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    adminPanel(): Promise<void>;
    insertuser(dto: CreateUserDto, req: any, res: any): Promise<Tokens>;
    deleteUserById(id: number, req: any, res: any): Promise<void>;
    editUser(id: number, dto: CreateUserDto, req: any, res: any): Promise<void>;
}
