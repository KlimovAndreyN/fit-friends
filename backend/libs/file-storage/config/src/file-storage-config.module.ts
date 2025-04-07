import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { fileStorageConfig } from './file-storage.config';

const ENV_FILE_PATH = 'apps/file-storage/.env';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [fileStorageConfig],
  expandVariables: true,
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})

export class FileStorageConfigModule { }
