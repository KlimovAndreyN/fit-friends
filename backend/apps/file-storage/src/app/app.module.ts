import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileStorageConfigModule } from '@project/file-storage/config';
import { getMongooseOptions } from '@project/shared/helpers';
import { FileUploaderModule } from '@project/file-storage/file-uploader';

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
