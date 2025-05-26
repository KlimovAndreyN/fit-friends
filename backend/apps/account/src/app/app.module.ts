import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { getMongooseOptions } from '@backend/shared/helpers';
import { AccountConfigModule } from '@backend/account/config'
import { AuthenticationModule } from '@backend/account/authentication'
import { FitQuestionnaireModule } from '@backend/account/fit-questionnaire'

@Module({
  imports: [
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConnectionNameOption.Account)),
    AuthenticationModule,
    FitQuestionnaireModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
