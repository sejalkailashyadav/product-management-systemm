import { UpdateRolPermissionDto } from './dto/update-rol-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RolPermissionService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllroles(): Promise<{
        id: number;
        name: string;
        email: string;
        isadmin: boolean;
    }[]>;
    findAllPermission(): Promise<{
        id: number;
        name: string;
        email: string;
        isadmin: boolean;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateRolPermissionDto: UpdateRolPermissionDto): string;
    remove(id: number): string;
}
