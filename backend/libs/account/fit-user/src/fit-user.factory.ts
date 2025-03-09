import { Injectable } from '@nestjs/common';

import { AuthUser, EntityFactory } from '@backend/shared/core';

import { FitUserEntity } from './fit-user.entity';

@Injectable()
export class FitUserFactory implements EntityFactory<FitUserEntity> {
  public create(entityPlainData: AuthUser): FitUserEntity {
    return new FitUserEntity(entityPlainData);
  }
}
