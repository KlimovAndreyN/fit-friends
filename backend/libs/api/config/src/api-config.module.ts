import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { apiConfig } from './api-config';

const ENV_FILE_PATH = 'apps/api/.env';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [apiConfig],
  expandVariables: true,
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})

export class ApiConfigModule { }
