import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { getMongooseOptions } from '@backend/shared/helpers';
import { AccountConfigModule } from '@backend/account/config'
import { AuthenticationModule } from '@backend/account/authentication'
import { FitFriendModule } from '@backend/account/fit-friend'
import { FitQuestionnaireModule } from '@backend/account/fit-questionnaire'
import { FitUserProfileModule } from '@backend/account/fit-user-profile'

@Module({
  imports: [
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions(ConnectionNameOption.Account)),
    AuthenticationModule,
    FitFriendModule,
    FitQuestionnaireModule,
    FitUserProfileModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
