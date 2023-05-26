import { IsEmail, IsString } from "class-validator";
export class CreateProductDto {

  product_name: string;

  product_description?: string;

  product_price?: string;

  product_image?: string;

  category_name?: string;
}
