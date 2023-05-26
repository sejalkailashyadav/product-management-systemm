import { IsEmpty, IsString } from "class-validator";

export class CreateOrderDto {
  price: string;
  quantity: string;
}
