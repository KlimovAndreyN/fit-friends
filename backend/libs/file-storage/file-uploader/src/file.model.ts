import { Document } from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { File } from '@backend/shared/core';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class FileModel extends Document implements File {
  @Prop({ required: true })
  public originalName: string;

  @Prop({ required: true })
  public hashName: string;

  @Prop({ required: true })
  public subDirectory: string;

  @Prop({ required: true })
  public path: string;

  @Prop({ required: true, })
  public mimetype: string;

  @Prop({ required: true })
  public size: number;

  public createdAt: Date;

  public updatedAt: Date;
}

export const FileModels: ModelDefinition[] = [{
  name: FileModel.name,
  schema: SchemaFactory.createForClass(FileModel)
}];
