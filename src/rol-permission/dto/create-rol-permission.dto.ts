import { IsEmpty, IsString } from "class-validator";

export class CreateRolPermissionDto {
  name: string;
  email: string;
  password?: string;
  roleId?: number;
}
