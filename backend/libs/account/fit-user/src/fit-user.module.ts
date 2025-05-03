import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';

import { FitUserRepository } from './fit-user.repository';
import { FitUserFactory } from './fit-user.factory';
import { FitUserModels } from './fit-user.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      FitUserModels,
      ConnectionNameOption.Account
    )
  ],
  providers: [
    FitUserRepository,
    FitUserFactory
  ],
  exports: [FitUserRepository]
})
export class FitUserModule { }
