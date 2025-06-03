import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Friend } from '@backend/shared/core';

@Schema({
  collection: 'friends',
  timestamps: true
})
export class FitFriendModel extends Document implements Friend {
  @Prop({ required: true })
  public firstFriendId: string;

  @Prop({ required: true })
  public secondFriendId: string;

  public createdAt: Date;

  public updatedAt: Date;
}

const FitFriendSchema = SchemaFactory.createForClass(FitFriendModel);

FitFriendSchema.index({ firstFriendId: 1, secondFriendId: 1 }, { unique: true });

export const FitFriendModels: ModelDefinition[] = [{
  name: FitFriendModel.name,
  schema: FitFriendSchema
}];
