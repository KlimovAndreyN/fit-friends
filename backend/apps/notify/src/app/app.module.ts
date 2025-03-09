import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule } from '@project/notify/config';
import { getMongooseOptions } from '@project/shared/helpers';
import { EmailSubscriberModule } from '@project/notify/email-subsriber';

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
