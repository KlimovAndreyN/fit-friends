import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { EmailSubscriber } from '@backend/shared/core';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements EmailSubscriber {
  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public name: string;
}

export const EmailSubscriberModels: ModelDefinition[] = [{
  name: EmailSubscriberModel.name,
  schema: SchemaFactory.createForClass(EmailSubscriberModel)
}];
