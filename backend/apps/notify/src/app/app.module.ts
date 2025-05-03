import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { getMongooseOptions } from '@backend/shared/helpers';
import { NotifyConfigModule } from '@backend/notify/config';
import { EmailSubscriberModule } from '@backend/notify/email-subsriber';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions(ConnectionNameOption.Notify)),
    NotifyConfigModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
