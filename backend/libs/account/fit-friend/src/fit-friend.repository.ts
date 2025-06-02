import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ConnectionNameOption } from '@backend/shared/core';
import { BaseMongoRepository } from '@backend/shared/data-access';

import { FitFriendEntity } from './fit-friend.entity';
import { FitFriendFactory } from './fit-friend.factory';
import { FitFriendModel } from './fit-friend.model';

@Injectable()
export class FitFriendRepository extends BaseMongoRepository<FitFriendEntity, FitFriendModel> {
  constructor(
    entityFactory: FitFriendFactory,
    @InjectModel(FitFriendModel.name, ConnectionNameOption.Account)
    fitFriendModel: Model<FitFriendModel>
  ) {
    super(entityFactory, fitFriendModel);
  }

  public async findByUserId(userId: string): Promise<FitFriendEntity | null> {
    const document = await this.model.findOne({ userId }).exec();

    return this.createEntityFromDocument(document);
  }
}
