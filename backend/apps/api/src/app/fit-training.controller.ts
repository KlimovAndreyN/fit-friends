import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, TrainingRoute, TrainingRdo, RequestWithRequestIdAndUserId, ApiParamOption, IdParam, DetailTrainingRdo } from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { FitTrainingService } from './fit-training.service';

@ApiTags(ApiServiceRoute.Trainings)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.Trainings)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitTrainingController {
  constructor(
    private fitTrainingService: FitTrainingService
  ) { }

  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() request: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings(TrainingRoute.ForSportsman, request);

    return data;
  }

  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Special)
  public async getSpecial(@Req() request: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings(TrainingRoute.Special, request);

    return data;
  }

  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Popular)
  public async getPopular(@Req() request: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings(TrainingRoute.Popular, request);

    return data;
  }

  @ApiResponse({ type: DetailTrainingRdo })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async show(
    @Param(ApiParamOption.TrainingId.name) trainingId: string,
    @Req() request: RequestWithRequestIdAndUserId
  ): Promise<DetailTrainingRdo> {
    const training = await this.fitTrainingService.findById(trainingId, request);

    return training;
  }
}
