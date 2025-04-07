import { Module } from '@nestjs/common';

import { ReviewController } from './review.controller';
import { ReviewFactory } from './review.factory';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewRepository,
    ReviewFactory
  ]
})
export class ReviewModule { }
