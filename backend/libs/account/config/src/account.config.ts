import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import {
  ConfigAlias, DEFAULT_MONGODB_PORT, DEFAULT_PORT,
  DEFAULT_RABBIT_PORT, Environment, ENVIRONMENTS
} from '@backend/shared/core';
import { getPort } from '@backend/shared/helpers';

export interface AccountConfig {
  environment: string;
  port: number;
  fileStorageServiceUrl: string;
  mongoDb: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    authBase: string;
  },
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
  },
  rabbit: {
    host: string;
    port: number;
    user: string;
    password: string;
    exchange: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required().label(ConfigAlias.NodeEnv),
  port: Joi.number().port().default(DEFAULT_PORT),
  fileStorageServiceUrl: Joi.string().required().label(ConfigAlias.FileStorageServiceUrlEnv),
  mongoDb: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.MongoDbHostEnv),
    port: Joi.number().port().default(DEFAULT_MONGODB_PORT),
    user: Joi.string().required().label(ConfigAlias.MongoDbPortEnv),
    password: Joi.string().required().label(ConfigAlias.MongoDbPasswordEnv),
    database: Joi.string().required().label(ConfigAlias.MongoDbDatabaseEnv),
    authBase: Joi.string().required().label(ConfigAlias.MongoDbAuthBaseEnv)
  }),
  jwt: Joi.object({
    accessTokenSecret: Joi.string().required().label(ConfigAlias.JwtAccessTokenSecretEnv),
    accessTokenExpiresIn: Joi.string().required().label(ConfigAlias.JwtAccessTokenExpiresInEnv),
    refreshTokenSecret: Joi.string().required().label(ConfigAlias.JwtRefreshTokenSecretEnv),
    refreshTokenExpiresIn: Joi.string().required().label(ConfigAlias.JwtRefreshTokenExpiresInEnv)
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required().label(ConfigAlias.RabbitHostEnv),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required().label(ConfigAlias.RabbitUserEnv),
    password: Joi.string().required().label(ConfigAlias.RabbitPasswordEnv),
    exchange: Joi.string().required().label(ConfigAlias.RabbitExchangeEnv)
  })
});

function validateConfig(config: AccountConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Account Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): AccountConfig {
  const config: AccountConfig = {
    environment: process.env[ConfigAlias.NodeEnv] as Environment,
    port: getPort(ConfigAlias.PortEnv, DEFAULT_PORT),
    fileStorageServiceUrl: process.env[ConfigAlias.FileStorageServiceUrlEnv],
    mongoDb: {
      host: process.env[ConfigAlias.MongoDbHostEnv],
      port: getPort(ConfigAlias.MongoDbPortEnv, DEFAULT_MONGODB_PORT),
      user: process.env[ConfigAlias.MongoDbUserEnv],
      password: process.env[ConfigAlias.MongoDbPasswordEnv],
      database: process.env[ConfigAlias.MongoDbDatabaseEnv],
      authBase: process.env[ConfigAlias.MongoDbAuthBaseEnv]
    },
    jwt: {
      accessTokenSecret: process.env[ConfigAlias.JwtAccessTokenSecretEnv],
      accessTokenExpiresIn: process.env[ConfigAlias.JwtAccessTokenExpiresInEnv],
      refreshTokenSecret: process.env[ConfigAlias.JwtRefreshTokenSecretEnv],
      refreshTokenExpiresIn: process.env[ConfigAlias.JwtRefreshTokenExpiresInEnv]
    },
    rabbit: {
      host: process.env[ConfigAlias.RabbitHostEnv],
      port: getPort(ConfigAlias.RabbitPortEnv, DEFAULT_RABBIT_PORT),
      user: process.env[ConfigAlias.RabbitUserEnv],
      password: process.env[ConfigAlias.RabbitPasswordEnv],
      exchange: process.env[ConfigAlias.RabbitExchangeEnv]
    }
  };

  validateConfig(config);

  return config;
}

export const accountConfig = registerAs(ConfigAlias.Application, getConfig);
