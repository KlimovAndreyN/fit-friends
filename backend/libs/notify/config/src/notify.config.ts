import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';
import {
  ApplicationConfig, applicationValidationSchema, getApplicationConfig, getMailSmtpConfig,
  getMongoDbConfig, getRabbitSubscriberConfig, MailSmtpConfig, mailSmtpValidationSchema, MongoDbConfig,
  mongoDbValidationSchema, RabbitSubscriberConfig, rabbitSubscriberValidationSchema, validateConfig
} from '@backend/shared/helpers';

export interface NotifyConfig extends ApplicationConfig, MongoDbConfig, RabbitSubscriberConfig, MailSmtpConfig {
  apiFitFriendsUrlEnv: string;
}

const validationSchema = Joi.object({
  ...applicationValidationSchema,
  apiFitFriendsUrlEnv: Joi.string().required().label(ConfigAlias.ApiFitFriendsUrlEnv),
  ...mongoDbValidationSchema,
  ...rabbitSubscriberValidationSchema,
  ...mailSmtpValidationSchema
});

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    ...getApplicationConfig(),
    apiFitFriendsUrlEnv: process.env[ConfigAlias.ApiFitFriendsUrlEnv],
    ...getMongoDbConfig(),
    ...getRabbitSubscriberConfig(),
    ...getMailSmtpConfig()
  };

  validateConfig(validationSchema, config, 'Notify');

  return config;
}

export const notifyConfig = registerAs(ConfigAlias.Application, getConfig);
