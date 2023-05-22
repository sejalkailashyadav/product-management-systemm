import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(): {
        msg: string;
    };
    signupLocal(dto: AuthDto, req: any, res: any): Promise<Tokens>;
    getLogin(): {
        msg: string;
    };
    signinLocal(dto: AuthDto, req: any, res: any): Promise<Tokens>;
    password(): {
        msg: string;
    };
    resetPassword(email: string, token: string, newPassword: string, req: any, res: any): Promise<void>;
    forget(): {
        msg: string;
    };
    forgotPassword(email: string, req: any, res: any): Promise<void>;
    logoutt(): {
        msg: string;
    };
    logout(userId: number, req: any, res: any): Promise<boolean>;
    panell(): {
        msg: string;
    };
    refreshTokens(userId: number, refreshToken: string): Promise<Tokens>;
    verification(): {
        msg: string;
    };
}
