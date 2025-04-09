import { Injectable } from '@nestjs/common';

import { Review } from '@backend/shared/core';

import { ReviewRepository } from './review.repository';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository
  ) { }

  //! временно, нужно ли будет?
  public async findById(id: string): Promise<ReviewEntity> {
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
