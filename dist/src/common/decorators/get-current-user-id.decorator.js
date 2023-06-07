"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserId = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUserId = (0, common_1.createParamDecorator)((_, context) => {
    const request = context.switchToHttp().getRequest();
    const { jwt_payload } = request.cookies;
    const user = JSON.parse(Buffer.from(jwt_payload.split('.')[1], 'base64').toString('utf-8'));
    return user.sub;
});
//# sourceMappingURL=get-current-user-id.decorator.js.map