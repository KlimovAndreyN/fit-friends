import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FitUserModule } from '@backend/account/fit-user';
import { getEnvMongooseOptions } from '@backend/shared/helpers';

@Module({
  imports: [
    FitUserModule,
    MongooseModule.forRootAsync(getEnvMongooseOptions())
  ]
})
export class AppModule { };
