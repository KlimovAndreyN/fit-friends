import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';
import { ApplicationConfig, applicationValidationSchema, getApplicationConfig, validateConfig } from '@backend/shared/helpers';

export interface ApiConfig extends ApplicationConfig {
  accountServiceUrl: string;
  fileStorageServiceUrl: string;
}

const validationSchema = Joi.object({
  ...applicationValidationSchema,
  accountServiceUrl: Joi.string().required().label(ConfigAlias.AccountServiceUrlEnv),
  fileStorageServiceUrl: Joi.string().required().label(ConfigAlias.FileStorageServiceUrlEnv)
});

function getConfig(): ApiConfig {
  const config: ApiConfig = {
    ...getApplicationConfig(),
    accountServiceUrl: process.env[ConfigAlias.AccountServiceUrlEnv],
    fileStorageServiceUrl: process.env[ConfigAlias.FileStorageServiceUrlEnv]
  };

  validateConfig(validationSchema, config, 'Api');

  return config;
}

export const apiConfig = registerAs(ConfigAlias.Application, getConfig);
