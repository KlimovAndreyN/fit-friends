import { Entity, StorableEntity, Review } from '@backend/shared/core';

export class ReviewEntity extends Entity implements StorableEntity<Review> {
  public userId: Review['userId'];
  public trainingId: Review['trainingId'];
  public rating: Review['rating'];
  public message: Review['message'];
  public createdAt?: Review['createdAt'];

  constructor(review?: Review) {
    super();

    this.populate(review);
  }

  public populate(review?: Review): void {
    if (!review) {
      return;
    }

    this.id = review.id ?? undefined;
    this.userId = review.userId;
    this.trainingId = review.trainingId;
    this.rating = review.rating;
    this.message = review.message;
    this.createdAt = review.createdAt ?? undefined;
  }

  public toPOJO(): Review {
    return {
      id: this.id,
      userId: this.userId,
      trainingId: this.trainingId,
      rating: this.rating,
      message: this.message,
      createdAt: this.createdAt
    }
  }
}
