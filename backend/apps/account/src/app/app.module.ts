import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongooseOptions } from '@project/shared/helpers';
import { AuthenticationModule } from '@project/account/authentication'
import { AccountConfigModule } from '@project/account/config'

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
