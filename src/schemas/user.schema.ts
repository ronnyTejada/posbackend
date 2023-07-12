import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  bussisnesName: string;

  @Prop()
  password: string;

  @Prop()
  rif_cedula: string;

  @Prop()
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
