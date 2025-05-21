import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, ApiParamOption, IdParam, ReviewRdo, RequestWithRequestIdAndUser } from '@backend/shared/core';
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
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<ReviewRdo[]> {
    const reviews = await this.fitReviewService.getReviews(trainingId, sub, role, requestId);

    return reviews;
  }

  //! добавление коментария прикрыть CheckRoleSportsmanGuard
}
