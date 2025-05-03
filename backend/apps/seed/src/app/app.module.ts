import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { getEnvMongooseOptions } from '@backend/shared/helpers';
import { FitUserModule } from '@backend/account/fit-user';
import { PrismaClientModule } from '@backend/fit/models';
import { QuestionnaireModule } from '@backend/fit/questionnaire';
import { TrainingModule } from '@backend/fit/training';
import { OrderModule } from '@backend/fit/order';
import { ReviewModule } from '@backend/fit/review';

import { FileUploaderWithoutServiceModule } from './file-uploader-without-service.module';
import { RefreshTokenWithoutServiceModule } from './refresh-token-without-service.module';

const EnvPrefix = {
  ACCOUNT: 'ACCOUNT',
  FILE_STORAGE: 'FILE_STORAGE'
} as const;

@Module({
  imports: [
    MongooseModule.forRootAsync(getEnvMongooseOptions(EnvPrefix.FILE_STORAGE, ConnectionNameOption.FileStorage)),
    MongooseModule.forRootAsync(getEnvMongooseOptions(EnvPrefix.ACCOUNT, ConnectionNameOption.Account)),
    FileUploaderWithoutServiceModule,
    RefreshTokenWithoutServiceModule,
    FitUserModule,
    PrismaClientModule,
    QuestionnaireModule,
    TrainingModule,
    OrderModule,
    ReviewModule
  ]
})
export class AppModule { }
