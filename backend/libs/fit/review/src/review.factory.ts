import { Injectable } from '@nestjs/common';

import { EntityFactory, Review } from '@backend/shared/core';

import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewFactory implements EntityFactory<ReviewEntity> {
  public create(entityPlainData: Review): ReviewEntity {
    return new ReviewEntity(entityPlainData);
  }
}
