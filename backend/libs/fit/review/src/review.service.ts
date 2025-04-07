import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Training } from '@backend/shared/core';

import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';
import { ReviewFactory } from './review.factory';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) { }

  private checkAuthorization(userId: string): void {
    if (!userId) {
      //! вынести в константы - ! у всех одна проверка вынести в хелперы
      throw new UnauthorizedException('Unauthorized.');
    }
  }

  //! временно, нужно ли будет?
  public async findById(id: string, userId: string): Promise<ReviewEntity> {
    this.checkAuthorization(userId);

    const foundReview = await this.reviewRepository.findById(id);

    return foundReview;
  }

  //! временно Review потом будет CreateReviewDto
  public async create(dto: Review, userId: string): Promise<ReviewEntity> {
    const entity: ReviewEntity = new ReviewEntity({ ...dto, userId });

    await this.reviewRepository.save(entity);

    return entity;
  }
}
