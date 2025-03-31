import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { accountConfig } from './account.config';

const ENV_FILE_PATH = 'apps/account/.env';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [accountConfig],
  expandVariables: true,
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})
export class AccountConfigModule { }
