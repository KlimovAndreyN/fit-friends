import { Controller } from '@nestjs/common';
import { RabbitHeader, RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { ConfigAlias, CreateEmailSubscriberDto, RabbitRouting, XHeader } from '@backend/shared/core';

import { EmailSubscriberService } from './email-subscriber.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly emailSubscriberService: EmailSubscriberService
  ) { }

  @RabbitSubscribe({
    exchange: process.env[ConfigAlias.RabbitExchangeEnv], // а как забрать через config module?
    queue: process.env[ConfigAlias.RabbitQueueSubscriberEnv], // а как забрать через config module?
    routingKey: RabbitRouting.AddEmailSubscriber
  })
  public async create(
    @RabbitHeader(XHeader.RequestId) requestId: string,
    @RabbitPayload() emailSubscriber: CreateEmailSubscriberDto
  ): Promise<void> {
    await this.emailSubscriberService.addEmailSubscriber(emailSubscriber, requestId);
  }
}
