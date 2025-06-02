import { Injectable } from '@nestjs/common';

import { EntityFactory, Friend } from '@backend/shared/core';

import { FitFriendEntity } from './fit-friend.entity';

@Injectable()
export class FitFriendFactory implements EntityFactory<FitFriendEntity> {
  public create(entityPlainData: Friend): FitFriendEntity {
    return new FitFriendEntity(entityPlainData);
  }
}
