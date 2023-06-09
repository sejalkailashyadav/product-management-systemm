"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRolPermissionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rol_permission_dto_1 = require("./create-rol-permission.dto");
class UpdateRolPermissionDto extends (0, mapped_types_1.PartialType)(create_rol_permission_dto_1.CreateRolPermissionDto) {
}
exports.UpdateRolPermissionDto = UpdateRolPermissionDto;
//# sourceMappingURL=update-rol-permission.dto.js.map