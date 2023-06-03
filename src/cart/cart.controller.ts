import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Render,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDto } from "../cart/dto/create-cart.dto";
import { Response, Request } from "express";
import { ProductService } from "src/product/product.service";
import { CategoriesService } from "src/categories/categories.service";
import { Public, GetCurrentUserId, GetCurrentUser } from "../common/decorators";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Controller("cart")
export class CartController {
  constructor(
    private jwtService: JwtService,
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly categoriesService: CategoriesService
  ) {}

  // @Public()
  // @Get("/current")
  // async get(@Req() req): Promise<any> {
  //   // const token = req.cookies.jwt_payload; // Assuming you stored the JWT payload in a cookie named 'jwt_payload'
  //   // const decodedToken = await this.jwtService.verifyAsync(token);
  //   console.log(req.headers);
  //   const { cookie } = req.headers;
  //   console.log(cookie);

  //   const user = JSON.parse(
  //     Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
  //   );

  //   console.log(user.sub, user.email);

  // Access the properties of the decoded token
  // const userId = decodedToken.sub;
  // const email = decodedToken.email;
  // console.log(userId,email);

  // Perform actions based on the token data
  // ...
  // }
  // @Public()
  // @Get('/')
  // @Render("prodcut_categorye")
  // async userPanell() {
  //   try {
  //     const products = await this.productService.getAllprodcut();
  //     const categories = await this.categoriesService.getAllCategories();
  //     const cart = {};
  //     return {products,categories,cart}; // Pass the products data to the view
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // @Public()
  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
  // //working
  // @Public()
  // @GetCurrent()
  // @Post("add")
  // async addToCarttt(
  //   @Body() addToCartDto: AddToCartDto,
  //   @Req() request: Request
  // ) {
  //   const { productId, quantity } = addToCartDto;
  //   const sessionId = request.cookies["sid"]; // Assuming the session ID is stored in the 'sid' cookie
  //   console.log(sessionId);

  //   // await this.cartService.addToCart(sessionId, productId, quantity);
  //   // Handle the response or return any data if needed
  // }
  // @Public()
  // @Get("/currentuser")
  // async doSomethingWithToken(@Req() req, @Res() res): Promise<any> {
  //   const token = req.cookies.jwt_payload; // Assuming you stored the JWT payload in a cookie named 'jwt_payload'
  //   const decodedToken = await this.jwtService.verifyAsync(token);

  //   // console.log(req.cookies);
  //   // console.log(userId);

  //   // res.cookies("jwt_payload");

  //   // console.log(req.cookies);
  //   return true;
  // }
  // //all cart items
  //get all cart,producrt and category

  @Public()
  @Render("prodcut_categorye")
  @Get("/all")
  async findAll(@Req() req, @Res() res) {
    console.log(req.headers);
    const { cookie } = req.headers;
    console.log(cookie);

    const user = JSON.parse(
      Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
    );

    console.log(user.sub, user.email);

    const userId = user.sub;

    return await this.cartService.getCartItems(+userId, req, res);
    // const products = await this.productService.getAllprodcut();
    // const categories = await this.categoriesService.getAllCategories();
    // return cartItems;
    // console.log(products, categories, cartItems);
    // return { products, categories, cartItems };
    // Process the cartItems or pass them to a view template for rendering

    // return res.render("product_category", { cartItems });
    // return cartItems;
  }

  //add cart
  @Public()
  @Post("add/:id")
  async addToCart(
    @Body() data: any,
    @Req() req,
    @Res() res,
    @Param("id") productId: number
  ) {
    try {
      const { quantity } = data;
      //user id
      console.log(req.headers);
      const { cookie } = req.headers;
      console.log(cookie);

      const user = JSON.parse(
        Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
      );

      console.log(user.sub, user.email);

      const userId = user.sub;

      const cart = await this.cartService.addToCart(
        userId,
        productId,
        quantity,
        req,
        res
      );
      console.log(cart);

      res.redirect("prodcut_categorye", { cart });
      // res.render("prodcut_categorye", { cart });

      // Redirect to the cart page after adding the item
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  //remove cart
  @Public()
  @Post("/delete/:id")
  remove(@Param("id") id: number, @Req() req, @Res() res) {
    return this.cartService.remove(id, req, res);
  }
}
