import { Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CategoriesService } from "src/categories/categories.service";
export declare class UserController {
    private readonly userService;
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
}
