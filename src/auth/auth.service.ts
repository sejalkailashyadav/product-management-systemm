import { ForbiddenException, Injectable, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtPayload } from "./types";
import { randomBytes } from "crypto";
import * as nodemailer from "nodemailer";
import { jwtSecret } from "../utils/constants";

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "codebackup122@gmail.com",
        pass: "uuceenmlfvmxcnos",
      },
    });
  }

  async forgotPassword(
    email: string,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    const resetToken = await this.generateSecureToken();

    await this.prisma.user.update({
      where: { email },
      data: { resetToken },
    });

    const mailOptions: nodemailer.SendMailOptions = {
      from: "codebackup122@gmail.com",
      to: email,
      subject: "Password Reset",
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
    res: Response
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.resetToken !== token) {
      throw new Error("Invalid reset token");
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
          resolve(buf.toString("hex"));
        }
      });
    });
  }

  async signupLocal(dto: AuthDto, req: Request, res: Response) {
    const hash = await argon.hash(dto.password);

    await this.prisma.user
      .create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hash,
          roleId: dto.roleId,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });
    res.redirect("/auth/signin");
    // const tokens = await this.getTokens(user.id, user.email);
    // await this.updateRtHash(user.id, tokens.refresh_token);

    // Set JWT payload as a cookie
    // res.cookie("jwt_payload", tokens.access_token);

    // res.redirect("/auth/signup");
    // return tokens;
  }

  async signinLocal(dto: AuthDto, req: Request, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    const findPermissions = await this.prisma.role.findUnique({
      where: { id: user.roleId },
      include: {
        permissions: true,
      },
    });

    const permi = findPermissions.permissions;
    // console.log('permii', permi);
    // console.log('>>>', permi[0].name);

    const ob = {};

    for (var i = 0; i < permi.length; i++) {
      // console.log(permi[i].name);
      ob[i] = permi[i].name;
    }

    console.log("obb", ob);

    if (!user) throw new ForbiddenException("Access Denied");

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    // const tokens = await this.signToken(user.id, user.email, user.roleId, ob);
    const tokens = await this.signToken({
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      permissions: ob,
    });

    console.log("token", tokens);

    // Set JWT payload as a cookie
    res.cookie("jwt_payload", tokens);

    // const users = await this.prisma.user.findMany({
    //   select: { id: true, email: true, name: true, isadmin: true },
    //   where: { isadmin: false },
    // });
    const products = await this.prisma.product.findMany({
      include: { catrgory: true },
    });

    const categories = await this.prisma.category.findMany();
    console.log(products, categories);
    // console.log(products[0].catrgory[0].category_name);

    // if (user.isadmin) {
    //   res.render("darshboard");
    //   // res.redirect('/user/users')
    //   // res.render("user-panel", { user, users });
    // } else {

    // res.redirect("Product/user_product");
    // res.render("user_home_page", {
    //   products: products,
    //   categories: categories,
    // });
    // res.redirect('/user/user_home');
    // res.redirect('/Product/user_product');
    // }

    // return tokens;

    if (!tokens) {
      throw new ForbiddenException();
    }
    const decodet = this.jwtService.decode(tokens);
    res.cookie("token", tokens, {});

    if (user.roleId == 2 || user.roleId == 3) {
      //superadmin and admin
      res.render("darshboard");
    }

    if (user.roleId == 1) {
      //simple user
      res.render("user_home_page", {
        products: products,
        categories: categories,
      });
    }

    return tokens;
  }
  async signToken(args: {
    id: number;
    email: string;
    roleId: number;
    permissions: object;
  }) {
    const payload = args;
    return this.jwtService.signAsync(payload, { secret: jwtSecret });
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
    res.clearCookie("token");
    return true;
  }

  // async logoutt(userId: number, req: Request, res: Response): Promise<boolean> {
  //   res.clearCookie("jwt_payload");
  //   res.clearCookie("refresh_token");
  //   return true;
  // }

  // async refreshTokens(
  //   userId: number,
  //   rt: string,
  //   res: Response
  // ){
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       id: userId,
  //     },
  //   });
  //   if (!user || !user.hashedRt) throw new ForbiddenException("Access Denied");

  //   const rtMatches = await argon.verify(user.hashedRt, rt);
  //   if (!rtMatches) throw new ForbiddenException("Access Denied");

  //   const findPermissions = await this.prisma.role.findUnique({
  //     where: { id: user.roleId },
  //     include: {
  //       permissions: true,
  //     },
  //   });

  //   const permi = findPermissions.permissions;
  //   // console.log('permii', permi);
  //   // console.log('>>>', permi[0].name);

  //   const ob = {};

  //   for (var i = 0; i < permi.length; i++) {
  //     // console.log(permi[i].name);
  //     ob[i] = permi[i].name;
  //   }

  //   console.log("obb", ob);
  //   const tokens = await this.signToken(user.id, user.email, user.roleId, ob);
  //   // await this.updateRtHash(user.id, tokens.refresh_token, res);

  //   // Set JWT payload as a cookie
  //   // Set JWT payload and refresh token as cookies
  //   (res as any).cookie("jwt_payload", tokens.access_token);
  //   (res as any).cookie("refresh_token", tokens.refresh_token);

  //   return tokens;
  // }

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

  async getUserFromToken(req: Request, res: Response) {
    const { token } = req.cookies;

    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    const uid = user.id;
    return uid;
  }
  //  async validateUser(jwtPayload: JwtPayload): Promise<any> {
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
}
