import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { accountConfig } from './account.config';

const ENV_FILE_PATH = 'apps/account/.env';

const configModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [accountConfig],
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})
export class AccountConfigModule { }
