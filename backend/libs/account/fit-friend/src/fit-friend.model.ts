import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Friend } from '@backend/shared/core';

@Schema({
  collection: 'friends',
  timestamps: true
})
export class FitFriendModel extends Document implements Friend {
  @Prop({ required: true, unique: true })
  public userId: string;

  @Prop({ required: true, type: Array })
  public friends: string[];

  public createdAt: Date;

  public updatedAt: Date;
}

export const FitFriendModels: ModelDefinition[] = [{
  name: FitFriendModel.name,
  schema: SchemaFactory.createForClass(FitFriendModel)
}];
