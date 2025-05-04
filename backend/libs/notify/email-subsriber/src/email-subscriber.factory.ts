import { Injectable } from '@nestjs/common';

import { EmailSubscriber, EntityFactory } from '@backend/shared/core';

import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberFactory implements EntityFactory<EmailSubscriberEntity> {
  public create(entityPlainData: EmailSubscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity(entityPlainData);
  }
}
