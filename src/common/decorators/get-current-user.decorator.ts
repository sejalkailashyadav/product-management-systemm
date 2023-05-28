import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../../auth/types';
import { JwtPayload } from '../../auth/types';
export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // if (!data) return request.user;
    // return request.user[data];
    const { jwt_payload } = request.cookies;

    const user: JwtPayload = JSON.parse(
      Buffer.from(jwt_payload.split('.')[1], 'base64').toString('utf-8'),
    );
    return user;
  },
);
