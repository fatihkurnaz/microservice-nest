import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  invoiceId: string;
}

// Yukarıdaki tanımladığım instance tanımlamasından , mongo'da ki oluşturulması gereken schema'yı çıkarır
export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
