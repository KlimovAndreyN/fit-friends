import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { BaseMongoRepository } from '@backend/shared/data-access';

import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileModel } from './file.model';

@Injectable()
export class FileUploaderRepository extends BaseMongoRepository<FileUploaderEntity, FileModel> {
  constructor(
    entityFactory: FileUploaderFactory,
    @InjectModel(FileModel.name, ConnectionNameOption.FileStorage)
    fileModel: Model<FileModel>
  ) {
    super(entityFactory, fileModel);
  }
}
