import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser, MetroStationName, UserGender, UserRole } from '@backend/shared/core';

@Schema({
  collection: 'accounts',
  timestamps: true
})
export class FitUserModel extends Document implements AuthUser {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop()
  public avatarFileId: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public birthday: Date;

  @Prop({ required: true, type: String })
  public metroStationName: MetroStationName;

  @Prop({ required: true })
  public backgroundPath: string;

  @Prop({ required: true, type: String })
  public gender: UserGender;

  @Prop({ required: true, type: String })
  public role: UserRole;

  public createdAt: Date;
}

export const FitUserSchema = SchemaFactory.createForClass(FitUserModel);
