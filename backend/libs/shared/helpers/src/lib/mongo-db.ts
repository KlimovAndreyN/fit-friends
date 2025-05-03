import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { ConfigAlias } from '@backend/shared/core';

import { addEnvPrefix, getMongoConnectionString } from './common';

export function getMongooseOptions(connectionName: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          host: config.get<string>(ConfigAlias.AppMongoDbHost),
          port: config.get<string>(ConfigAlias.AppMongoDbPort),
          user: config.get<string>(ConfigAlias.AppMongoDbUser),
          password: config.get<string>(ConfigAlias.AppMongoDbPassword),
          database: config.get<string>(ConfigAlias.AppMongoDbDatabase),
          authBase: config.get<string>(ConfigAlias.AppMongoDbAuthBase)
        })
      }
    },
    inject: [ConfigService],
    connectionName
  }
}

export function getEnvMongooseOptions(envPrefix: string, connectionName: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async () => {
      [
        ConfigAlias.MongoDbHostEnv,
        ConfigAlias.MongoDbPortEnv,
        ConfigAlias.MongoDbUserEnv,
        ConfigAlias.MongoDbPasswordEnv,
        ConfigAlias.MongoDbDatabaseEnv,
        ConfigAlias.MongoDbAuthBaseEnv,
      ].map((item) => {
        const itemEnv = addEnvPrefix(envPrefix, item);

        Logger.log(`${itemEnv}: ${process.env[itemEnv]}`, 'getEnvMongooseOptions');
      });

      return {
        uri: getMongoConnectionString({
          host: process.env[addEnvPrefix(envPrefix, ConfigAlias.MongoDbHostEnv)],
          port: process.env[addEnvPrefix(envPrefix, ConfigAlias.MongoDbPortEnv)],
          user: process.env[addEnvPrefix(envPrefix, ConfigAlias.MongoDbUserEnv)],
          password: process.env[addEnvPrefix(envPrefix, ConfigAlias.MongoDbPasswordEnv)],
          database: process.env[addEnvPrefix(envPrefix, ConfigAlias.MongoDbDatabaseEnv)],
          authBase: process.env[addEnvPrefix(envPrefix, ConfigAlias.MongoDbAuthBaseEnv)]
        })
      }
    },
    connectionName
  }
}
