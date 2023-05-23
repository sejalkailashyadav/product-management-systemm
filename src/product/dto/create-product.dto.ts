import { IsEmail, IsString } from "class-validator";
export class CreateProductDto {
  @IsString()
  product_name: string;
  @IsString()
  product_description?: string;
  @IsString()
  product_price?: string;
  @IsString()
  product_image?: string;
}
