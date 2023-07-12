import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  customerName: string;

  @Prop()
  id: string;

  @Prop()
  customerDoc: string;

  @Prop()
  products: [];

  @Prop()
  total: number;

  @Prop()
  date: string;

  @Prop()
  hour: string;


  @Prop()
  paid: boolean;

  @Prop()
  seller: string;
  @Prop()
  owner: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
