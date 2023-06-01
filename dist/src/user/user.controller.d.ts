import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userPanel(): Promise<{
        users: import(".prisma/client").User[];
    }>;
    insertuser(dto: CreateUserDto, req: any, res: any): Promise<import("../auth/types").Tokens>;
    deleteUserById(id: number, req: any, res: any): Promise<void>;
    editUser(id: number, dto: CreateUserDto, req: any, res: any): Promise<void>;
}
