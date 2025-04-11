import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber } from '@backend/shared/core';
import { notifyConfig } from '@backend/notify/config';

import { AddSubcriber } from './mail.constant';

@Injectable()
export class MailService {
  @Inject(notifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof notifyConfig>;

  constructor(
    private readonly mailerService: MailerService
  ) { }

  public async sendNotifyNewSubscriber(subscriber: Subscriber): Promise<void> {
    const { name, email } = subscriber;
    const { mailSmtp: { from } } = this.notifyConfig;
    const { fitFriendsUrlEnv: url } = this.notifyConfig;
    const { SUBJECT: subject, TEMPLATE: template } = AddSubcriber;

    const sendMailOption: ISendMailOptions = {
      from,
      to: email,
      subject,
      template,
      context: { name, email, url, urlTitle: 'FitFriends' }
    };

    await this.mailerService.sendMail(sendMailOption);
  }
}
