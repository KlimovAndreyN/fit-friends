import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { getMongooseOptions } from '@backend/shared/helpers';
import { FileStorageConfigModule } from '@backend/file-storage/config';
import { FileUploaderModule } from '@backend/file-storage/file-uploader';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConnectionNameOption.FileStorage))
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
