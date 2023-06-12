import { Permission } from '../entities/permissions.enum';
export declare const Permissions: (...permissions: Permission[]) => import("@nestjs/common").CustomDecorator<string>;
