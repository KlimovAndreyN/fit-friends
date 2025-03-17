import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';
import {
  ApplicationConfig, applicationValidationSchema, getApplicationConfig, getJwtConfig,
  getMongoDbConfig, getRabbitConfig, JwtConfig, jwtValidationSchema, MongoDbConfig,
  mongoDbValidationSchema, RabbitConfig, rabbitValidationSchema, testParseTime, validateConfig
} from '@backend/shared/helpers';

const TokenDefaultExpiresIn = {
  ACCESS: '15m',
  REFRESH: '7d'
} as const;

export interface AccountConfig extends ApplicationConfig, JwtConfig, MongoDbConfig, RabbitConfig { }

const validationSchema = Joi.object({
  ...applicationValidationSchema,
  ...jwtValidationSchema,
  ...mongoDbValidationSchema,
  ...rabbitValidationSchema
});

function getConfig(): AccountConfig {
  const config: AccountConfig = {
    ...getApplicationConfig(),
    ...getJwtConfig(TokenDefaultExpiresIn.ACCESS, TokenDefaultExpiresIn.REFRESH),
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
