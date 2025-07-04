import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeaders, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, XApiHeaderOptions, ApiParamOption, IdParam, BasicReviewRdo } from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { GuidValidationPipe } from '@backend/shared/pipes';

import { ReviewService } from './review.service';

@ApiTags(ServiceRoute.Reviews)
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Reviews)
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService
  ) { }

  @ApiResponse({ type: BasicReviewRdo, isArray: true })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async index(@Param(ApiParamOption.TrainingId.name, GuidValidationPipe) trainingId: string): Promise<BasicReviewRdo[]> {
    const entities = await this.reviewService.findByTrainingId(trainingId);

    return entities.map((entity) => (fillDto(BasicReviewRdo, entity.toPOJO())));
  }

  //! при добавлении отзыва нужно проверить куплена/завершена ли тренировка... а несколько раз куплена как по ТЗ?
}
