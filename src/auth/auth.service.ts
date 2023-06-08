import {
  ForbiddenException,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';
import { rmSync } from 'fs';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
<<<<<<< HEAD
      // Configure your email service provider details here
      service: 'gmail',
=======
      service: "gmail",
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
      auth: {
        user: 'codebackup122@gmail.com',
        pass: 'uuceenmlfvmxcnos',
      },
    });
  }

  async forgotPassword(
    email: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const resetToken = await this.generateSecureToken();

    await this.prisma.user.update({
      where: { email },
      data: { resetToken },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: 'codebackup122@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your password reset token is: ${resetToken}`,
    };

    await this.transporter.sendMail(mailOptions);
    // const redirectUrl = '/auth/change-password';
    // res.redirect(redirectUrl);
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
    req: Request,
    res: Response,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.resetToken !== token) {
      throw new Error('Invalid reset token');
    }
    const hashedPassword = await argon.hash(newPassword);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword, resetToken: null },
    });
  }

  private async generateSecureToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      randomBytes(20, (err, buf) => {
        if (err) {
          reject(err);
        } else {
          resolve(buf.toString('hex'));
        }
      });
    });
  }

  async signupLocal(
    dto: AuthDto,
    req: Request,
    res: Response,
  ): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user
      .create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);

    // Set JWT payload as a cookie
<<<<<<< HEAD
    res.cookie('jwt_payload', tokens.access_token, { httpOnly: true });

    res.redirect('/auth/local/signup');
=======
    res.cookie("jwt_payload", tokens.access_token);

    res.redirect("/auth/signup");
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
    return tokens;
  }

  async signinLocal(
    dto: AuthDto,
<<<<<<< HEAD
    @Req() req: Request,
    @Res() res: Response,
=======
    req: Request,
    res: Response
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
  ): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
<<<<<<< HEAD
    console.log('data');

    console.log(tokens);
    console.log(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);

    // Set JWT payload as a cookie
    res.cookie('jwt_payload', tokens.access_token, { httpOnly: true });
=======
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

    // Set JWT payload as a cookie
    res.cookie("jwt_payload", tokens.access_token);

    // const users = await this.prisma.user.findMany({
    //   select: { id: true, email: true, name: true, isadmin: true },
    //   where: { isadmin: false },
    // });
    const products = await this.prisma.product.findMany({
      include: { catrgory: true },
    });

<<<<<<< HEAD
    res.render('user_Panel', { user, users });
    // console.log(users);

    return tokens;
  }

  async logout(userId: number, req: Request, res: Response): Promise<boolean> {
    res.clearCookie('jwt_payload');
    res.clearCookie('refresh_token');
    return true;
  }
  async refreshTokens(
    userId: number,
    rt: string,
    res: Response,
=======
    const categories = this.prisma.category.findMany();

    if (user.isadmin) {
      res.render("darshboard");
      // res.redirect('/user/users')
      // res.render("user-panel", { user, users });
    } else {

      res.render("user_home_page", {
        products: products,
        categories: categories,
      });
      // res.redirect('/user/user_home');
      // res.redirect('/Product/user_product');
    }

    return tokens;
  }
  async getAllprodcut() {
    return await this.prisma.product.findMany({
      include: { catrgory: true },
    });
  }
  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async logout(userId: number, req: Request, res: Response): Promise<boolean> {
    res.clearCookie("jwt_payload");
    res.clearCookie("refresh_token");
    return true;
  }

  async refreshTokens(
    userId: number,
    rt: string,
    res: Response
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
  ): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token, res);

    // Set JWT payload as a cookie
    // Set JWT payload and refresh token as cookies
<<<<<<< HEAD
    res.cookie('jwt_payload', tokens.access_token, { httpOnly: true });
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
=======
    (res as any).cookie("jwt_payload", tokens.access_token);
    (res as any).cookie("refresh_token", tokens.refresh_token);
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a

    return tokens;
  }

  async updateRtHash(userId: number, rt: string, res: Response): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    console.log(jwtPayload);

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
<<<<<<< HEAD
        expiresIn: '10m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: '7d',
=======
        expiresIn: "10m",
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: "7d",
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
<<<<<<< HEAD
  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    if (!jwtPayload || !jwtPayload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    return this.prisma.user.findUnique({ where: { id: jwtPayload.sub } });
  }
=======

//   async validateUser(jwtPayload: JwtPayload): Promise<any> {
//     if (!jwtPayload || !jwtPayload.sub) {
//       throw new UnauthorizedException("Invalid token payload");
//     }

//     return this.prisma.user.findUnique({ where: { id: jwtPayload.sub } });
//   }
//   //google sign-in
//   googleLogin(req, res: Response) {
//     if (!req.user) {
//       return "No user from google";
//     }
//     else{

//  const products =  this.prisma.product.findMany({
//       include: { catrgory: true },
//     });

//     const categories = this.prisma.category.findMany();
//        res.render("user_home_page", { products, categories });
  
//     }
//     return {
//       message: "User information from google",
//       user: req.user
      
//     };
//   }

  //store in db
  // async googlevalidateUser(details: UserDetails) {
  //   console.log("AuthService");
  //   console.log(details);
  //   const user = await this.prisma.user.findUnique({ email: details.email });
  //   console.log(user);
  //   if (user) return user;
  //   console.log("User not found. Creating...");
  //   const newUser = this.prisma.user.create(details);
  //   console.log(newUser);
    
  //   return newUser;
  // }

  // async findUser(id: number) {
  //   const user = await this.prisma.user.findUnique({ id });
  //   return user;
  // } 
>>>>>>> dec3b3ff12bcc5cfd1cf1e4f26b73f770f67cb5a
}
// async validateUser(jwtPayload: JwtPayload): Promise<any> {
//   return this.prisma.user.findUnique({ where: { email: jwtPayload.email } });
// }
