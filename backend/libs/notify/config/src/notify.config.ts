import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import {
  ConfigAlias, DEFAULT_MONGODB_PORT, DEFAULT_PORT, DEFAULT_RABBIT_PORT,
  DEFAULT_SMTP_PORT, Environment, ENVIRONMENTS
} from '@backend/shared/core';
import { getPort } from '@backend/shared/helpers';

export interface NotifyConfig {
  environment: string;
  port: number;
  apiFitFriendsUrlEnv: string;
  mongoDb: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    authBase: string;
  },
  rabbit: {
    host: string;
    port: number;
    user: string;
    password: string;
    exchange: string;
    queueSubscriber: string;
  },
  mailSmtp: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required().label(ConfigAlias.NodeEnv),
  port: Joi.number().port(),
  apiFitFriendsUrlEnv: Joi.string().required().label(ConfigAlias.ApiFitFriendsUrlEnv),
  mongoDb: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.MongoDbHostEnv),
    port: Joi.number().port(),
    user: Joi.string().required().label(ConfigAlias.MongoDbPortEnv),
    password: Joi.string().required().label(ConfigAlias.MongoDbPasswordEnv),
    database: Joi.string().required().label(ConfigAlias.MongoDbDatabaseEnv),
    authBase: Joi.string().required().label(ConfigAlias.MongoDbAuthBaseEnv)
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.RabbitHostEnv),
    port: Joi.number().port(),
    user: Joi.string().required().label(ConfigAlias.RabbitUserEnv),
    password: Joi.string().required().label(ConfigAlias.RabbitPasswordEnv),
    exchange: Joi.string().required().label(ConfigAlias.RabbitExchangeEnv),
    queueSubscriber: Joi.string().required().label(ConfigAlias.RabbitQueueSubscriberEnv)
  }),
  mailSmtp: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.MailSmtpHostEnv),
    port: Joi.number().port(),
    user: Joi.string().required().label(ConfigAlias.MailSmtpUserEnv),
    password: Joi.string().required().label(ConfigAlias.MailSmtpPasswordEnv),
    from: Joi.string().required().label(ConfigAlias.MailSmtpFromEnv)
  })
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
    environment: process.env[ConfigAlias.NodeEnv] as Environment,
    port: getPort(ConfigAlias.PortEnv, DEFAULT_PORT),
    apiFitFriendsUrlEnv: process.env[ConfigAlias.ApiFitFriendsUrlEnv],
    mongoDb: {
      host: process.env[ConfigAlias.MongoDbHostEnv],
      port: getPort(ConfigAlias.MongoDbPortEnv, DEFAULT_MONGODB_PORT),
      user: process.env[ConfigAlias.MongoDbUserEnv],
      password: process.env[ConfigAlias.MongoDbPasswordEnv],
      database: process.env[ConfigAlias.MongoDbDatabaseEnv],
      authBase: process.env[ConfigAlias.MongoDbAuthBaseEnv]
    },
    rabbit: {
      host: process.env[ConfigAlias.RabbitHostEnv],
      port: getPort(ConfigAlias.RabbitPortEnv, DEFAULT_RABBIT_PORT),
      user: process.env[ConfigAlias.RabbitUserEnv],
      password: process.env[ConfigAlias.RabbitPasswordEnv],
      exchange: process.env[ConfigAlias.RabbitExchangeEnv],
      queueSubscriber: process.env[ConfigAlias.RabbitQueueSubscriberEnv]
    },
    mailSmtp: {
      host: process.env[ConfigAlias.MailSmtpHostEnv],
      port: getPort(ConfigAlias.MailSmtpPortEnv, DEFAULT_SMTP_PORT),
      user: process.env[ConfigAlias.MailSmtpUserEnv],
      password: process.env[ConfigAlias.MailSmtpPasswordEnv],
      from: process.env[ConfigAlias.MailSmtpFromEnv]
    }
  };

  validateConfig(config);

  return config;
}

export const notifyConfig = registerAs(ConfigAlias.Application, getConfig);
