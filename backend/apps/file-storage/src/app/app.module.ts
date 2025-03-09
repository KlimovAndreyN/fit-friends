import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileStorageConfigModule } from '@backend/file-storage/config';
import { getMongooseOptions } from '@backend/shared/helpers';
import { FileUploaderModule } from '@backend/file-storage/file-uploader';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
