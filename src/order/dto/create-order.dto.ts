import { IsEmpty, IsString } from "class-validator";

export class CreateOrderDto {
  user_id: number;
  product_id: number;
  quantity: string;
}
