import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  id: string;
  @Prop()
  inventory: string;
  @Prop()
  price: number;
  @Prop()
  code: string;
  @Prop()
  cost: number;
  @Prop()
  category: string;
  @Prop()
  quantity: number;
  @Prop()
  unity: string;
  @Prop()
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
