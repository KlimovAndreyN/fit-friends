import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber } from '@project/shared/core';
import { notifyConfig } from '@project/notify/config';

import { ADD_SUBCRIBER_TEMPLATE, ADD_SUBSCRIBER_SUBJECT } from './mail.constant';

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
    const { apiFitFriendsUrlEnv: url } = this.notifyConfig;

    const sendMailOption: ISendMailOptions = {
      from,
      to: email,
      subject: ADD_SUBSCRIBER_SUBJECT,
      template: ADD_SUBCRIBER_TEMPLATE,
      context: { name, email, url, urlTitle: 'FitFriends' }
    };

    await this.mailerService.sendMail(sendMailOption);
  }
}
