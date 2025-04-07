import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { notifyConfig } from './notify.config';

const ENV_FILE_PATH = 'apps/notify/.env';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [notifyConfig],
  expandVariables: true,
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})
export class NotifyConfigModule { }
