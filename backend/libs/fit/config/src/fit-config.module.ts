import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { fitConfig } from './fit.config';

const ENV_FILE_PATH = 'apps/fit/.env';

const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  load: [fitConfig],
  expandVariables: true,
  envFilePath: ENV_FILE_PATH
}

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)]
})
export class FitConfigModule { }
