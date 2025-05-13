import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { ConnectionNameOption } from '@backend/shared/core';
import { getRabbitMQOptions } from '@backend/shared/helpers';
import { MailModule } from '@backend/notify/mail';

import { EmailSubscriberModels } from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberController } from './email-subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      EmailSubscriberModels,
      ConnectionNameOption.Notify
    ),
    RabbitMQModule.forRootAsync(getRabbitMQOptions()),
    MailModule
  ],
  controllers: [
    EmailSubscriberController
  ],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory
  ]
})
export class EmailSubscriberModule { }
