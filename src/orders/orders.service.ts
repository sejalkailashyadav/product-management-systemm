import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {Request, Response} from 'express'
// import * as swal from 'sweetalert2'



@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService){}

  async create(req: Request, res: Response) {
    
    try{
      //console.log(req.headers);
    const { cookie } = req.headers;
   // console.log(cookie);

    const user = JSON.parse(
      Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
    );

    //console.log(user.sub, user.email);

    const userId = user.sub;


      const subtotal = await this.prismaService.cart.findMany({where:{
        userId:userId
      }})
      
      var finaltotal=0;
     // console.log("subtotal",subtotal);
      for(var i=0;i<subtotal.length;i++){
        var finaltotal = finaltotal+subtotal[i].total;
      }
      //console.log("finaltotal",finaltotal);

      
        const order = await this.prismaService.order.create({
          data:{
            total:finaltotal,
            userId:userId
          
          }
        })
  
      // await this.prismaService.cart.deleteMany({where:{
      //   userId: uid
      // }})

      // await this.prismaService.orderItem.create({
      //   data:{
      //     quantity
      //   }
      // })
      
      // toastr.success('Have fun storming the castle!', 'Miracle Max Says')
    //console.log("order placed");
    res.send(order);
    // res.redirect('/orders/orderpage')
      }
   
    
    catch(err){
      throw err;
    }
  }

  async findAll(req:Request, res:Response) {
    const orders = await this.prismaService.order.findMany({
      include: {
        user: true,
      },
    });
    const name = orders[0].user.name;
    const email = orders[0].user.email;
    //  console.log(orders[0].user.name);

    //  console.log(orders[0].user.createdAt);
     
    // console.log();

    //console.log(orders);
    return { orders: orders, name: name };
  }

  async findOrderByUser(req:Request, res:Response) {
    //console.log(req.headers);
    const { cookie } = req.headers;
   // console.log(cookie);

    const user = JSON.parse(
      Buffer.from(cookie.split(".")[1], "base64").toString("utf-8")
    );

   // console.log(user.sub, user.email);

    const userId = user.sub;

    const orders = await this.prismaService.order.findMany({
      where:{
        userId: userId
      },
      include:{
        orderItems: true
      }
      
    })
   // console.log("orderbyuser", orders);
    
    return {orders}
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
