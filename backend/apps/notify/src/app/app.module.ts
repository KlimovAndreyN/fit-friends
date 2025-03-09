import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule } from '@backend/notify/config';
import { getMongooseOptions } from '@backend/shared/helpers';
import { EmailSubscriberModule } from '@backend/notify/email-subsriber';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
