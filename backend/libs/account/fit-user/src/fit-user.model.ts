import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser } from '@backend/shared/core';

@Schema({
  collection: 'accounts',
  timestamps: true
})
export class FitUserModel extends Document implements AuthUser {
  @Prop({ required: true, unique: true })
  public email: AuthUser['email'];

  @Prop({ required: true })
  public name: AuthUser['name'];

  @Prop()
  public avatarFileId: AuthUser['avatarFileId'];

  @Prop({ required: true })
  public passwordHash: AuthUser['passwordHash'];

  @Prop()
  public birthday: AuthUser['birthday'];

  @Prop({ required: true, type: String })
  public metroStationName: AuthUser['metroStationName'];

  @Prop({ required: true })
  public backgroundPath: string;

  @Prop({ required: true, type: String })
  public gender: AuthUser['gender'];

  @Prop({ required: true, type: String })
  public role: AuthUser['role'];

  @Prop({ required: true })
  public existQuestionnaire: AuthUser['existQuestionnaire'];

  public createdAt: AuthUser['createdAt'];
}

export const FitUserSchema = SchemaFactory.createForClass(FitUserModel);
