import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongooseOptions } from '@backend/shared/helpers';
import { AuthenticationModule } from '@backend/account/authentication'
import { AccountConfigModule } from '@backend/account/config'

@Module({
  imports: [
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
