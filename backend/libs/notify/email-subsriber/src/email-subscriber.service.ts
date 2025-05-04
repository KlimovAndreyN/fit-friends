import { Injectable, Logger } from '@nestjs/common';

import { CreateEmailSubscriberDto, XHeader } from '@backend/shared/core';
import { MailService } from '@backend/notify/mail';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService
  ) { }

  public async addEmailSubscriber(dto: CreateEmailSubscriberDto, requestId: string): Promise<void> {
    Logger.log(`AddEmailSubscriber: ${XHeader.RequestId}: ${requestId || 'empty'}`, EmailSubscriberService.name);

    const { email } = dto;
    const existsEmailSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsEmailSubscriber) {
      Logger.log('AddEmailSubscriber: subscriber exists', EmailSubscriberService.name);

      return;
    }

    const emailSubscriber = new EmailSubscriberEntity(dto);

    await this.emailSubscriberRepository.save(emailSubscriber);
    Logger.log(`AddEmailSubscriber: new email subscriber ${email} saved`, EmailSubscriberService.name);

    await this.mailService.sendNotifyNewEmailSubscriber(dto);
  }
}
