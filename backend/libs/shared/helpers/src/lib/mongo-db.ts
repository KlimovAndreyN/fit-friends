import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { ConfigAlias } from '@backend/shared/core';

import { getMongoConnectionString } from './common';

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

export function getEnvMongooseOptions(connectionName: string): MongooseModuleAsyncOptions {
  return {
    useFactory: async () => {
      [
        ConfigAlias.MongoDbHostEnv,
        ConfigAlias.MongoDbPortEnv,
        ConfigAlias.MongoDbUserEnv,
        ConfigAlias.MongoDbPasswordEnv,
        ConfigAlias.MongoDbDatabaseEnv,
        ConfigAlias.MongoDbAuthBaseEnv,
      ].map((itemEnv) => {
        Logger.log(`${itemEnv}: ${process.env[itemEnv]}`, 'getEnvMongooseOptions');
      });

      return {
        uri: getMongoConnectionString({
          host: process.env[ConfigAlias.MongoDbHostEnv],
          port: process.env[ConfigAlias.MongoDbPortEnv],
          user: process.env[ConfigAlias.MongoDbUserEnv],
          password: process.env[ConfigAlias.MongoDbPasswordEnv],
          database: process.env[ConfigAlias.MongoDbDatabaseEnv],
          authBase: process.env[ConfigAlias.MongoDbAuthBaseEnv]
        })
      }
    },
    connectionName
  }
}
