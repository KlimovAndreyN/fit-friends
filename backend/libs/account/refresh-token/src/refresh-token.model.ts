import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { JwtToken } from '@backend/shared/core';

@Schema({
  collection: 'refresh-sessions',
  timestamps: true
})
export class RefreshTokenModel extends Document implements JwtToken {
  @Prop({ required: true })
  public tokenId: string;

  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public expiresIn: Date;

  public createdAt: Date;
}

export const RefreshTokenModels: ModelDefinition[] = [{
  name: RefreshTokenModel.name,
  schema: SchemaFactory.createForClass(RefreshTokenModel)
}];
