import { Injectable,Req, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";


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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  //insert prodcu data with category -multer
  async setprodct_category(
    categoryId: number,
    dto: CreateProductDto,
    req: Request,
    res: Response
  ) {
    return await this.prismaSerivce.product.create({
      data: {
        product_name: dto.product_name,
        product_description: dto.product_description,
        product_price: dto.product_price,
        product_image: dto.product_image,

        catrgory: {
          connect: { id: categoryId },
        },
      },
    });
  }

  //update many to many
  // async updatedata() {
  //   await this.prismaSerivce.product.update({
  //     where: { id: 12 },
  //     data: {
  //       product_name: "phone",
  //       product_description: "Lorem ipsum dolor sit amet consectetur",
  //       product_price: "10000",
  //       product_image: "image.png",
  //       catrgory: {
  //         set: [{ id: 11 }, { id: 12 }],
  //         create: { category_name: "telephone" },
  //       },
  //     },
  //   });
  // }

  //delete  deleteproduct_category by id
  // @Public()
  // @Post("/deleet_pc/:id")
  // async deleteproduct_category(
  //   @Param("id") id: number,
  //   @Body() dto: CreateProductDto,
  //   @Request() req,
  //   @Response() res
  // ) {
  //   return this.productService.deleteUserById(Number(id), dto, res, req);
  // }

  // async updatedata(
  //   dto: CreateProductDto,
  //   req: Request,
  //   res: Response
  // ) {
  //   await this.prismaSerivce.product.update({
  //     where: { id: 1 },
  //     data: {
  //       product_name: dto.product_name,
  //       product_description: dto.product_description,
  //       product_price: dto.product_price,
  //       product_image: dto.product_image,
  //       catrgory: {
  //         set: [{ id: 1 }],
  //         create: [{ category_name: dto.category_name }],
  //       },
  //     },
  //   });
  // }

  // //update user
  async deleteproductById(
    id: number,
    dto: CreateProductDto,
    req: Request,
    res: Response
  ) {
    await this.prismaSerivce.product.delete({
      where: {
        id: id,
      },
    });
  }

  // async addProduct(categoryId: number, productData: CreateProductDto, productImage: FileUpload) {
  //   const { product_name, product_description, product_price } = productData;

  //   // Handle image upload
  //   let uploadedImage: string = null;
  //   if (productImage) {
  //     uploadedImage = await this.uploadImage(productImage);
  //   }

  //   return this.prismaSerivce.product.create({
  //     data: {
  //       product_name,
  //       product_description,
  //       product_price,
  //       product_image: uploadedImage,
  //       catrgory: {
  //         connect: { id: categoryId },
  //       },
  //     },
  //   });
  // }
}
