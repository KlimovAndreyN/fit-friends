import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';
import {
  ApplicationConfig, applicationValidationSchema, getApplicationConfig, getJWTConfig,
  getMongoDbConfig, getRabbitConfig, JWTConfig, jwtValidationSchema, MongoDbConfig,
  mongoDbValidationSchema, RabbitConfig, rabbitValidationSchema, testParseTime, validateConfig
} from '@backend/shared/helpers';

const TokenExpiresIn = {
  ACCESS: '15m',
  REFRESH: '7d'
} as const;

export interface AccountConfig extends ApplicationConfig, JWTConfig, MongoDbConfig, RabbitConfig {
  fileStorageServiceUrl: string;
}

const validationSchema = Joi.object({
  ...applicationValidationSchema,
  fileStorageServiceUrl: Joi.string().required().label(ConfigAlias.FileStorageServiceUrlEnv),
  ...jwtValidationSchema,
  ...mongoDbValidationSchema,
  ...rabbitValidationSchema
});

function getConfig(): AccountConfig {
  const config: AccountConfig = {
    ...getApplicationConfig(),
    fileStorageServiceUrl: process.env[ConfigAlias.FileStorageServiceUrlEnv],
    ...getJWTConfig(TokenExpiresIn.ACCESS, TokenExpiresIn.REFRESH),
    ...getMongoDbConfig(),
    ...getRabbitConfig()
  };

  validateConfig(validationSchema, config, 'Account');

  const { jwt: { accessTokenExpiresIn, refreshTokenExpiresIn } } = config;

  testParseTime(accessTokenExpiresIn, ConfigAlias.JwtAccessTokenExpiresInEnv);
  testParseTime(refreshTokenExpiresIn, ConfigAlias.JwtRefreshTokenExpiresInEnv);

  return config;
}

export const accountConfig = registerAs(ConfigAlias.Application, getConfig);
