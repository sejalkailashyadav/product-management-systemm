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
  async getAllCategories(){
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
    res: Response,
    file: any
  ) {
    return await this.prismaSerivce.product.create({
      data: {
        product_name: dto.product_name,
        product_description: dto.product_description,
        product_price: dto.product_price,
        product_image: file.path,

        catrgory: {
          connect: { id: categoryId },
        },
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
