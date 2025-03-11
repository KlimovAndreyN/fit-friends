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

  //! Тест
  console.log('getConfig Api');

  console.log('NX_LOAD_DOT_ENV_FILES', process.env['NX_LOAD_DOT_ENV_FILES']);
  console.log('RABBIT_EXCHANGE', process.env['RABBIT_EXCHANGE']);
  console.log('MONGODB_DATABASE', process.env['RABBIT_EXCHANGE']);
  console.log('UPLOAD_DIRECTORY_PATH', process.env['UPLOAD_DIRECTORY_PATH']);
  console.log('ACCOUNT_SERVICE_URL', process.env['ACCOUNT_SERVICE_URL']);
  //

  return config;
}

export const apiConfig = registerAs(ConfigAlias.Application, getConfig);
