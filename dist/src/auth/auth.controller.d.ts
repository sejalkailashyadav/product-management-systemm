import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(): {
        msg: string;
    };
    signupLocal(dto: AuthDto, req: any, res: any): Promise<Tokens>;
    getuserLogin(): {
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
    panell(): {
        msg: string;
    };
    refreshTokens(userId: number, refreshToken: string, res: any): Promise<Tokens>;
    verification(): {
        msg: string;
    };
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): "No user from google" | {
        message: string;
        user: any;
    };
    user(req: any): {
        msg: string;
    };
    logout(userId: number, req: any, res: any): Promise<boolean>;
}
