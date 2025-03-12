import Joi, { ObjectSchema } from 'joi';

import {
  ConfigAlias, DEFAULT_MONGODB_PORT, DEFAULT_PORT,
  DEFAULT_RABBIT_PORT, DEFAULT_SMTP_PORT, Environment, ENVIRONMENTS
} from '@backend/shared/core';

import { getPort } from './common';

export interface ApplicationConfig {
  environment: string;
  port: number;
}

export interface JwtConfig {
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
  }
}

export interface MongoDbConfig {
  mongoDb: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    authBase: string;
  }
}

export interface RabbitConfig {
  rabbit: {
    host: string;
    port: number;
    user: string;
    password: string;
    exchange: string;
  }
}

export interface RabbitSubscriberConfig extends RabbitConfig {
  rabbitSubscriber: {
    queue: string;
  }
}

export interface MailSmtpConfig {
  mailSmtp: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  }
}

export const applicationValidationSchema = {
  environment: Joi.string().valid(...ENVIRONMENTS).required().label(ConfigAlias.NodeEnv),
  port: Joi.number().port().required().label(ConfigAlias.PortEnv)
};

export const jwtValidationSchema = {
  jwt: Joi.object({
    accessTokenSecret: Joi.string().required().label(ConfigAlias.JwtAccessTokenSecretEnv),
    accessTokenExpiresIn: Joi.string().required().label(ConfigAlias.JwtAccessTokenExpiresInEnv),
    refreshTokenSecret: Joi.string().required().label(ConfigAlias.JwtRefreshTokenSecretEnv),
    refreshTokenExpiresIn: Joi.string().required().label(ConfigAlias.JwtRefreshTokenExpiresInEnv)
  })
};

export const mongoDbValidationSchema = {
  mongoDb: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.MongoDbHostEnv),
    port: Joi.number().port().required().label(ConfigAlias.MongoDbPortEnv),
    user: Joi.string().required().label(ConfigAlias.MongoDbUserEnv),
    password: Joi.string().required().label(ConfigAlias.MongoDbPasswordEnv),
    database: Joi.string().required().label(ConfigAlias.MongoDbDatabaseEnv),
    authBase: Joi.string().required().label(ConfigAlias.MongoDbAuthBaseEnv)
  })
};

export const rabbitValidationSchema = {
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.RabbitHostEnv),
    port: Joi.number().port().required().label(ConfigAlias.RabbitPortEnv),
    user: Joi.string().required().label(ConfigAlias.RabbitUserEnv),
    password: Joi.string().required().label(ConfigAlias.RabbitPasswordEnv),
    exchange: Joi.string().required().label(ConfigAlias.RabbitExchangeEnv)
  })
};

export const rabbitSubscriberValidationSchema = {
  ...rabbitValidationSchema,
  rabbitSubscriber: Joi.object({
    queue: Joi.string().required().label(ConfigAlias.RabbitQueueSubscriberEnv)
  })
};

export const mailSmtpValidationSchema = {
  mailSmtp: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.MailSmtpHostEnv),
    port: Joi.number().port().required().label(ConfigAlias.MailSmtpPortEnv),
    user: Joi.string().required().label(ConfigAlias.MailSmtpUserEnv),
    password: Joi.string().required().label(ConfigAlias.MailSmtpPasswordEnv),
    from: Joi.string().required().label(ConfigAlias.MailSmtpFromEnv)
  })
};

export function getApplicationConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env[ConfigAlias.NodeEnv] as Environment,
    port: getPort(ConfigAlias.PortEnv, DEFAULT_PORT)
  };

  return config;
}

export function getJwtConfig(accessTokenExpiresInDefault: string, refreshTokenExpiresInDefault: string): JwtConfig {
  const config: JwtConfig = {
    jwt: {
      accessTokenSecret: process.env[ConfigAlias.JwtAccessTokenSecretEnv],
      accessTokenExpiresIn: process.env[ConfigAlias.JwtAccessTokenExpiresInEnv] || accessTokenExpiresInDefault,
      refreshTokenSecret: process.env[ConfigAlias.JwtRefreshTokenSecretEnv],
      refreshTokenExpiresIn: process.env[ConfigAlias.JwtRefreshTokenExpiresInEnv] || refreshTokenExpiresInDefault
    }
  };

  return config;
}

export function getMongoDbConfig(): MongoDbConfig {
  const config: MongoDbConfig = {
    mongoDb: {
      host: process.env[ConfigAlias.MongoDbHostEnv],
      port: getPort(ConfigAlias.MongoDbPortEnv, DEFAULT_MONGODB_PORT),
      user: process.env[ConfigAlias.MongoDbUserEnv],
      password: process.env[ConfigAlias.MongoDbPasswordEnv],
      database: process.env[ConfigAlias.MongoDbDatabaseEnv],
      authBase: process.env[ConfigAlias.MongoDbAuthBaseEnv]
    }
  };

  return config;
}

export function getRabbitConfig(): RabbitConfig {
  const config: RabbitConfig = {
    rabbit: {
      host: process.env[ConfigAlias.RabbitHostEnv],
      port: getPort(ConfigAlias.RabbitPortEnv, DEFAULT_RABBIT_PORT),
      user: process.env[ConfigAlias.RabbitUserEnv],
      password: process.env[ConfigAlias.RabbitPasswordEnv],
      exchange: process.env[ConfigAlias.RabbitExchangeEnv]
    }
  };

  return config;
}

export function getRabbitSubscriberConfig(): RabbitSubscriberConfig {
  const config: RabbitSubscriberConfig = {
    ...getRabbitConfig(),
    rabbitSubscriber: {
      queue: process.env[ConfigAlias.RabbitQueueSubscriberEnv]
    }
  };

  return config;
}

export function getMailSmtpConfig(): MailSmtpConfig {
  const config: MailSmtpConfig = {
    mailSmtp: {
      host: process.env[ConfigAlias.MailSmtpHostEnv],
      port: getPort(ConfigAlias.MailSmtpPortEnv, DEFAULT_SMTP_PORT),
      user: process.env[ConfigAlias.MailSmtpUserEnv],
      password: process.env[ConfigAlias.MailSmtpPasswordEnv],
      from: process.env[ConfigAlias.MailSmtpFromEnv]
    }
  };

  return config;
}

export function validateConfig<T>(validationSchema: ObjectSchema<T>, config: T, configName: string): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[${configName} Config Validation Error]: ${error.message}`);
  }
}
