import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { CreateEmailSubscriberDto, RabbitRouting } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { accountConfig } from '@backend/account/config';

@Injectable()
export class NotifyService {
  @Inject(accountConfig.KEY)
  private readonly accountOptions: ConfigType<typeof accountConfig>;

  constructor(
    private readonly rabbitClient: AmqpConnection
  ) { }

  public async registerEmailSubscriber(dto: CreateEmailSubscriberDto, requestId: string): Promise<boolean> {
    const result = await this.rabbitClient.publish(
      this.accountOptions.rabbit.exchange,
      RabbitRouting.AddEmailSubscriber,
      dto,
      makeHeaders(requestId)
    );

    return result;
  }
}
