import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, RequestWithRequestIdAndUserId, ApiParamOption, IdParam, ReviewRdo } from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { FitReviewService } from './fit-review.service';

@ApiTags(ApiServiceRoute.Reviews)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.Reviews)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitReviewController {
  constructor(
    private fitReviewService: FitReviewService
  ) { }

  @ApiResponse({ type: ReviewRdo })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async index(
    @Param(ApiParamOption.TrainingId.name) trainingId: string,
    @Req() request: RequestWithRequestIdAndUserId
  ): Promise<ReviewRdo[]> {
    const reviews = await this.fitReviewService.getReviews(trainingId, request);

    return reviews;
  }

  //! добавление коментария прикрыть CheckRoleSportsmanGuard
}
