import { Injectable } from '@nestjs/common';

import { EntityFactory, TrainingRequest } from '@backend/shared/core';

import { TrainingRequestEntity } from './training-request.entity';

@Injectable()
export class TrainingRequestFactory implements EntityFactory<TrainingRequestEntity> {
  public create(entityPlainData: TrainingRequest): TrainingRequestEntity {
    return new TrainingRequestEntity(entityPlainData);
  }
}
