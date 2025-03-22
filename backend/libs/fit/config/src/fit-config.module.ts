import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { fitConfig } from './fit.config';

const ENV_FILE_PATH = 'apps/fit/.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fitConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class FitConfigModule { }
