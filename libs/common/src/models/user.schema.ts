import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop()
  email: string;
  @Prop()
  password: string;
}

// Yukarıdaki tanımladığım instance tanımlamasından , mongo'da ki oluşturulması gereken schema'yı çıkarır
export const UserSchema = SchemaFactory.createForClass(UserDocument);
