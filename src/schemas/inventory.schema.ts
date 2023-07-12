import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
  @Prop()
  name: string;

  @Prop()
  id: string;

  @Prop()
  owner: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
