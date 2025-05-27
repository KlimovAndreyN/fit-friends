import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser, Location, Gender, Role } from '@backend/shared/core';

@Schema({
  collection: 'accounts',
  timestamps: false // т.к. при заполении использую ручную генерацию дат
})
export class FitUserModel extends Document implements AuthUser {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop()
  public about: string;

  @Prop()
  public avatarFileId: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop()
  public birthday: Date;

  @Prop({ required: true, type: String })
  public location: Location;

  @Prop({ required: true })
  public backgroundPath: string;

  @Prop({ required: true, type: String })
  public gender: Gender;

  @Prop({ required: true, type: String })
  public role: Role;

  @Prop({ type: Date, default: () => new Date() })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

// т.к. при заполении использую ручную генерацию дат
const FitUserSchema = SchemaFactory.createForClass(FitUserModel);

FitUserSchema.pre('save', function () {
  this.updatedAt = new Date();
});

FitUserSchema.pre('findOneAndUpdate', function () {
  this.set({ updatedAt: new Date() });
});
//

export const FitUserModels: ModelDefinition[] = [{
  name: FitUserModel.name,
  schema: FitUserSchema
}];
