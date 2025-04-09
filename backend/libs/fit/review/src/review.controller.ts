import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, XApiHeaderOptions, Review } from '@backend/shared/core';

import { ReviewService } from './review.service';

@ApiTags('review')
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Review)
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) { }

  //! добавить описание
  //@ApiResponse({ type: ReviewRdo }) //! вынести в описание
  @Get()
  public async show(@Param() id: string): Promise<Review> {
    const entity = await this.reviewService.findById(id);

    //! временно
    return entity;
    //return fillDto(Review, entity.toPOJO());
  }
}
