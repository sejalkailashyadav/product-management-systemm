import { RolPermissionService } from './rol-permission.service';
import { UpdateRolPermissionDto } from './dto/update-rol-permission.dto';
export declare class RolPermissionController {
    private readonly rolPermissionService;
    constructor(rolPermissionService: RolPermissionService);
    findAllroles(): Promise<{
        users: {
            id: number;
            name: string;
            email: string;
            isadmin: boolean;
        }[];
    }>;
    findAllPermission(): Promise<{
        users: {
            id: number;
            name: string;
            email: string;
            isadmin: boolean;
        }[];
    }>;
    findOne(id: string): string;
    update(id: string, updateRolPermissionDto: UpdateRolPermissionDto): string;
    remove(id: string): string;
}
