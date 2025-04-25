import { Controller, Get, Param, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, TrainingRoute, TrainingRdo, ApiParamOption,
  DetailTrainingRdo, TrainingQuery, BearerAuth, IdParam,
  RequestWithRequestIdAndUser, TrainingsWithPaginationRdo
} from '@backend/shared/core';
import { getQueryString } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
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

  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get()
  public async index(
    @Query() query: TrainingQuery,
    @Req() request: RequestWithRequestIdAndUser
  ): Promise<TrainingsWithPaginationRdo> {
    const data = await this.fitTrainingService.getTrainings<TrainingsWithPaginationRdo>(getQueryString(query), request);

    return data;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() request: RequestWithRequestIdAndUser): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings<TrainingRdo[]>(TrainingRoute.ForSportsman, request);

    return data;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Special)
  public async getSpecial(@Req() request: RequestWithRequestIdAndUser): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings<TrainingRdo[]>(TrainingRoute.Special, request);

    return data;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Popular)
  public async getPopular(@Req() request: RequestWithRequestIdAndUser): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings<TrainingRdo[]>(TrainingRoute.Popular, request);

    return data;
  }

  @ApiResponse({ type: DetailTrainingRdo })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async show(
    @Param(ApiParamOption.TrainingId.name) trainingId: string,
    @Req() request: RequestWithRequestIdAndUser
  ): Promise<DetailTrainingRdo> {
    const training = await this.fitTrainingService.findById(trainingId, request);

    return training;
  }
}
