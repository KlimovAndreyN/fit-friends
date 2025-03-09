import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { accountConfig } from '@backend/account/config';
import { CreateSubscriberDto } from '@backend/notify/email-subsriber';

@Injectable()
export class NotifyService {
  @Inject(accountConfig.KEY)
  private readonly accountOptions: ConfigType<typeof accountConfig>;

  constructor(
    private readonly rabbitClient: AmqpConnection
  ) { }

  public async registerSubscriber(dto: CreateSubscriberDto, requestId: string) {
    const result = await this.rabbitClient.publish<CreateSubscriberDto>(
      this.accountOptions.rabbit.exchange,
      RabbitRouting.AddSubscriber,
      dto,
      makeHeaders(requestId)
    );

    return result;
  }
}
