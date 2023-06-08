import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/types';

// export const GetCurrentUserId = createParamDecorator(
//   (_: undefined, context: ExecutionContext): number => {
//     const request = context.switchToHttp().getRequest();
//     console.log('jwtpallllllllllllllllllllllllllll');
//     //console.log(request);
//     const { jwt_payload } = request.cookies;
//     console.log(jwt_payload);

//     //console.log(request.jwt_payload);
//     // console.log(request.cookie);
//     const user = jwt_payload as JwtPayload;
//     console.log(user);
//     console.log(user.sub, user.email);
//     return user.sub;
//   },
// );

export const GetCurrentUserId = createParamDecorator(
  (_, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const { jwt_payload } = request.cookies;
<<<<<<< HEAD
=======
    //console.log(jwt_payload);
   // console.log("request");
    
   // console.log(request);
    
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

    const user: JwtPayload = JSON.parse(
      Buffer.from(jwt_payload.split('.')[1], 'base64').toString('utf-8'),
    );
<<<<<<< HEAD
    console.log('kllllllllllreoijrgoijgoijrgoijrgoijriogjrtg');

    console.log(user.sub, user.email);
=======
    //console.log('kllllllllllreoijrgoijgoijrgoijrgoijriogjrtg');

    //console.log(user.sub, user.email);
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

    return user.sub;
  },
);
