import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, RequestWithUserId, XApiHeaderOptions, Review } from '@backend/shared/core';

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
  public async show(@Req() { userId }: RequestWithUserId, @Param() id: string): Promise<Review> {
    const entity = await this.reviewService.findById(id, userId);

    //! временно
    return entity;
    //return fillDto(Review, entity);
  }
}
