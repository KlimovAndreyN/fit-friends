import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { FileUploaderRepository, FileUploaderFactory, FileModels } from '@backend/file-storage/file-uploader';

@Module({
  imports: [
    MongooseModule.forFeature(
      FileModels,
      ConnectionNameOption.FileStorage
    )
  ],
  providers: [
    FileUploaderRepository,
    FileUploaderFactory
  ],
  exports: [FileUploaderRepository]
})
export class FileUploaderWithoutServiceModule { }
