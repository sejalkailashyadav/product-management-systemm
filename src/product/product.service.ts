import { Injectable, Req, Res, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
import { log } from "util";

@Injectable()
export class ProductService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return "This action adds a new product";
  }

  async getAllprodcut() {
    return await this.prismaSerivce.product.findMany({
      include: { catrgory: true },
    });
  }
  async getAllCategories() {
    return this.prismaSerivce.category.findMany();
  }

  async createUser(dto: CreateProductDto, req: Request, category_id:number,file) {
     const product = await this.prismaSerivce.product.create({
       data: {
         product_name: dto.product_name,
         product_description: dto.product_description,
         product_price: dto.product_price,
         product_image: file.path,
         catrgory: {
           connect: { id: +category_id },
         },
       },
       include: {
         catrgory: true,
       },
     });
  return product;
  }

  // update many to many
  async updatedata(
    categoryId: number,
    product_name: string,
    product_description: string,
    product_price: string,
    product_image: string,
    id: number,
    req: Request,
    res: Response
  ) {
    try {
      return await this.prismaSerivce.product.update({
        where: { id: +id },
        data: {
          product_name: product_name,
          // product_description: product_description,
          // product_price: product_price,
          // product_image: product_image,
          catrgory: {
            connect: { id: +categoryId },
          },
        },
        include: { catrgory: true },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async editUserById(
    id: number,
    product_name: string,
    product_description: string,
    product_price: string,
    categoryId: number,
    req: Request
  ) {
    await this.prismaSerivce.product.update({
      where: {
        id: id,
      },
      data: {
        product_name: product_name,
        product_description: product_description,
        product_price: product_price,
        catrgory: {
          connect: {
            id: +categoryId,
          },
        },
      },
      include: { catrgory: true },
    });
  }

  async deleteproductById(id: number) {
    await this.prismaSerivce.product.delete({
      where: {
        id: +id,
      },
    });
  }

  async usersAllProducts(req: Request, res: Response) {
    try {
      const products = await this.prismaSerivce.product.findMany({
        include: {
          catrgory: true,
        },
      });
      //console.log(products);
      //console.log("pwithc", products[0].catrgory[0].category_name);
      return { products };
    } catch (err) {
      throw err;
    }
  }
  async findProductById(id: number, req: Request, res: Response) {
    try {
      const product = await this.prismaSerivce.product.findUnique({
        where: {
          id,
        },
        include: {
          catrgory: true,
        },
      });

     // console.log("pro", product);

      return { product };
    } catch (err) {
      throw err;
    }
  }
  async findAllProducts() {
    try {
      // const { draw, search, order } = req.query;

      const query = {
        include: { catrgory: true },
      };
      // const products =  await this.prismaService.product.findMany({
      //   include:{
      //     categories: true
      //   }

      // })

      return await this.prismaSerivce.product.findMany(query);

      // console.log("products",products);

      // return res.json(
      // )
      // return { products };

      // return res.json({
      //   draw:draw,
      //   data:products
      // })
    } catch (err) {
      throw err;
    }
  }

  async productByCategory(category_name: string, res: Response, req: Request) {
    try {
      const products = await this.prismaSerivce.product.findMany({
        where: {
          catrgory: {
            some: {
              category_name: {
                contains: category_name,
              },
            },
          },
          // categories:[{
          //   where:{id: categoryId}
          // }]
        },
        include: {
          catrgory: true,
        },
      });
     // console.log("pbyc", products);
      // console.log(products[2].categories);

      res.render("user_home_page", { products });
      // res.redirect('/products/user_product')
      // return {products}
    } catch (err) {
      throw err;
    }
  }

  async findProduct(id: number) {
    try {
      return await this.prismaSerivce.product.findUnique({
        where: { id },
        include: {
          catrgory: true,
        },
      });

      // console.log('pro', product);

      // return { product };
    } catch (err) {
      throw err;
    }
  }
}