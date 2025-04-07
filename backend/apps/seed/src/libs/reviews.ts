import { Logger } from '@nestjs/common';

import { Review } from '@backend/shared/core'
import { getRandomBoolean, getRandomDate, getRandomNumber } from '@backend/shared/helpers';
import { OrderEntity } from '@backend/fit/order';
import { ReviewEntity, ReviewRepository } from '@backend/fit/review';

import { MockReviewOption, MockTrainingOption } from './mock-data';

export async function clearReviews(reviewRepository: ReviewRepository): Promise<void> {
  await reviewRepository.client.review.deleteMany();
}

export async function seedReviews(reviewRepository: ReviewRepository, orders: OrderEntity[]): Promise<ReviewEntity[]> {
  const reviews: ReviewEntity[] = [];
  const { MIN_RATING, MAX_RATING } = MockReviewOption;
  const { MIN_DATE, MAX_DATE } = MockTrainingOption;

  for (const { userId, trainingId } of orders) {
    if (getRandomBoolean()) {
      const review: Review = {
        userId,
        trainingId,
        rating: getRandomNumber(MIN_RATING, MAX_RATING),
        message: `Review message... userId(${userId}) for trainingId(${trainingId})`,
        createdAt: getRandomDate(MIN_DATE, MAX_DATE)
      }
      const reviewEntity = new ReviewEntity(review);

      await reviewRepository.save(reviewEntity);
      reviews.push(reviewEntity);

      Logger.log(`Added review: userId: ${userId} / trainingId: ${trainingId}`);
    }
  }

  return reviews;
}
