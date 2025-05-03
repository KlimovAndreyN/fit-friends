import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';

import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenFactory } from './refresh-token.factory';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: RefreshTokenModel.name, schema: RefreshTokenSchema }],
      ConnectionNameOption.Account
    )
  ],
  providers: [
    RefreshTokenService,
    RefreshTokenRepository,
    RefreshTokenFactory
  ],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule { }
