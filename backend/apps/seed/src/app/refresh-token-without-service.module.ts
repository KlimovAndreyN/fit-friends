import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { RefreshTokenRepository, RefreshTokenFactory, RefreshTokenModels } from '@backend/account/refresh-token';

@Module({
  imports: [
    MongooseModule.forFeature(
      RefreshTokenModels,
      ConnectionNameOption.Account
    )
  ],
  providers: [
    RefreshTokenRepository,
    RefreshTokenFactory
  ],
  exports: [RefreshTokenRepository]
})
export class RefreshTokenWithoutServiceModule { }
