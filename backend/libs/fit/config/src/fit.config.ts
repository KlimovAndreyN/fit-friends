import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';
import {
  ApplicationConfig, applicationValidationSchema, getApplicationConfig,
  getPostgresConfig, PostgresConfig, postgresValidationSchema, validateConfig
} from '@backend/shared/helpers';

export interface FitConfig extends ApplicationConfig, PostgresConfig { }

const validationSchema = Joi.object({
  ...applicationValidationSchema,
  ...postgresValidationSchema
});

function getConfig(): FitConfig {
  const config: FitConfig = {
    ...getApplicationConfig(),
    ...getPostgresConfig()
  };

  validateConfig(validationSchema, config, 'Fit');

  return config;
}

export const fitConfig = registerAs(ConfigAlias.Application, getConfig);
