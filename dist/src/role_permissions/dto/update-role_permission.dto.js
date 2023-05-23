"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRolePermissionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_role_permission_dto_1 = require("./create-role_permission.dto");
class UpdateRolePermissionDto extends (0, mapped_types_1.PartialType)(create_role_permission_dto_1.CreateRolePermissionDto) {
}
exports.UpdateRolePermissionDto = UpdateRolePermissionDto;
//# sourceMappingURL=update-role_permission.dto.js.map