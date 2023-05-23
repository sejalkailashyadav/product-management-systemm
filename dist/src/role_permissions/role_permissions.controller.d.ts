import { RolePermissionsService } from './role_permissions.service';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
export declare class RolePermissionsController {
    private readonly rolePermissionsService;
    constructor(rolePermissionsService: RolePermissionsService);
    create(createRolePermissionDto: CreateRolePermissionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRolePermissionDto: UpdateRolePermissionDto): string;
    remove(id: string): string;
}
