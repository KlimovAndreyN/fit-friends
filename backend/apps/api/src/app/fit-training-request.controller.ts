import { Body, Controller, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, BearerAuth, ApiParamOption, RequestWithRequestIdAndUserId,
  RequestWithRequestIdAndUser, TrainingRequestRdo, IdParam,
  CreateTrainingRequestDto, UpdateTrainingRequestDto
} from '@backend/shared/core';
import { GuidValidationPipe } from '@backend/shared/pipes';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
import { FitTrainingRequestService } from './fit-training-request.service';

//! Добавить описание
@ApiTags(ApiServiceRoute.TrainingsRequests)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.TrainingsRequests)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitTrainingRequestController {
  constructor(
    private readonly fitTrainingRequestService: FitTrainingRequestService
  ) { }

  @ApiResponse({ type: TrainingRequestRdo })
  @UseGuards(CheckRoleSportsmanGuard)
  @Post()
  public async create(
    @Body() dto: CreateTrainingRequestDto,
    @Req() request: RequestWithRequestIdAndUser
  ): Promise<TrainingRequestRdo> {
    const trainingRequest = await this.fitTrainingRequestService.create(dto, request);

    return trainingRequest;
  }

  @ApiResponse({ type: TrainingRequestRdo })
  @ApiParam(ApiParamOption.TrainingRequestId)
  @Patch(IdParam.TRAINING_REQUEST)
  public async update(
    @Body() dto: UpdateTrainingRequestDto,
    @Param(ApiParamOption.TrainingRequestId.name, GuidValidationPipe) trainingRequestId: string,
    @Req() { userId, requestId }: RequestWithRequestIdAndUserId
  ): Promise<TrainingRequestRdo> {
    const trainingRequest = await this.fitTrainingRequestService.update(dto, trainingRequestId, userId, requestId);

    return trainingRequest;
  }
}
