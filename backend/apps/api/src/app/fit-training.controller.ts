import { Controller, Get, Inject, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, TrainingRoute, TrainingRdo, RequestWithRequestIdAndUserId } from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { apiConfig } from '@backend/api/config';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { FitTrainingService } from './fit-training.service';

@ApiTags(ApiServiceRoute.Trainings)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.Trainings)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitTrainingController {
  constructor(
    private readonly httpService: HttpService,
    private fitTrainingService: FitTrainingService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
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
}
