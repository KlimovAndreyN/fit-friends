import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { TrainingRequest } from '@backend/shared/core';

import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';

@Injectable()
export class TrainingRequestRepository extends BasePostgresRepository<TrainingRequestEntity, TrainingRequest> {
  constructor(
    entityFactory: TrainingRequestFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  //! пока пусто
}
