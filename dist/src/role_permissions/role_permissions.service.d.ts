import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
export declare class RolePermissionsService {
    create(createRolePermissionDto: CreateRolePermissionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): string;
    remove(id: number): string;
}
