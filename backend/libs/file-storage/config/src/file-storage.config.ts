import { registerAs } from '@nestjs/config';
import Joi from 'joi';

import { ConfigAlias } from '@backend/shared/core';
import {
  ApplicationConfig, applicationValidationSchema, getApplicationConfig,
  getMongoDbConfig, MongoDbConfig, mongoDbValidationSchema, validateConfig
} from '@backend/shared/helpers';

export interface FileStorageConfig extends ApplicationConfig, MongoDbConfig {
  uploadDirectoryPath: string;
  serveRoot: string;
}

const validationSchema = Joi.object({
  ...applicationValidationSchema,
  uploadDirectoryPath: Joi.string().required().label(ConfigAlias.UploadDirectoryEnv),
  serveRoot: Joi.string().required().label(ConfigAlias.ServeRootEnv),
  ...mongoDbValidationSchema
});

function getConfig(): FileStorageConfig {
  const config: FileStorageConfig = {
    ...getApplicationConfig(),
    uploadDirectoryPath: process.env[ConfigAlias.UploadDirectoryEnv],
    serveRoot: process.env[ConfigAlias.ServeRootEnv],
    ...getMongoDbConfig()
  };

  validateConfig(validationSchema, config, 'FileStorage');

  return config;
}

export const fileStorageConfig = registerAs(ConfigAlias.Application, getConfig);
