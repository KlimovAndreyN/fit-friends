import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/shared/core';
import { makeHeaders } from '@project/shared/helpers';
import { accountConfig } from '@project/account/config';
import { CreateSubscriberDto } from '@project/notify/email-subsriber';

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
