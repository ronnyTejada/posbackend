import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(order: OrderDto): Promise<any> {
    const created = new this.orderModel(order);
    return created.save();
  }

  async getOrders(owner: string): Promise<any> {
    console.log(owner);
    const ordersFound = await this.orderModel.find({ owner: owner }).exec();
    return ordersFound;
  }
}
