import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { getMongooseOptions } from '@backend/shared/helpers';
import { AuthenticationModule } from '@backend/account/authentication'
import { AccountConfigModule } from '@backend/account/config'

@Module({
  imports: [
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConnectionNameOption.Account))
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
