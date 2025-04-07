import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { Review } from '@backend/shared/core';

import { ReviewEntity } from './review.entity';
import { ReviewFactory } from './review.factory';

@Injectable()
export class ReviewRepository extends BasePostgresRepository<ReviewEntity, Review> {
  constructor(
    entityFactory: ReviewFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  //! временно, нужно будет?
  public async findById(id: string): Promise<ReviewEntity> {
    const record = await this.client.review.findFirst({ where: { id } });

    if (!record) {
      //! вынести в константы
      throw new NotFoundException('Training Not Found');
    }

    return new ReviewEntity({ ...record });
  }

  public async save(entity: ReviewEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.review.create({
      data: { ...pojoEntity }
    });

    entity.id = record.id;
    entity.createdAt = record.createdAt;
  }
}
