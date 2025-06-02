import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';

import { FitFriendService } from './fit-friend.service';
import { FitFriendController } from './fit-friend.controller';
import { FitFriendRepository } from './fit-friend.repository';
import { FitFriendFactory } from './fit-friend.factory';
import { FitFriendModels } from './fit-friend.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      FitFriendModels,
      ConnectionNameOption.Account
    )
  ],
  providers: [
    FitFriendService,
    FitFriendRepository,
    FitFriendFactory
  ],
  controllers: [FitFriendController],
  exports: [FitFriendRepository]
})
export class FitFriendModule { }
