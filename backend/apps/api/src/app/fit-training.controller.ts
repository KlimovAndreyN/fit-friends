import { Controller, Get, Inject, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, TrainingRoute, TrainingRdo, RequestWithRequestIdAndUserId, ServiceRoute } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { apiConfig } from '@backend/api/config';

import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.Trainings)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.Trainings)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitTrainingController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  //! все одинаковое! объеденить
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const url = this.apiOptions.fitServiceUrl + '/' + ServiceRoute.Trainings + '/' + TrainingRoute.ForSportsman;
    console.log(url);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<TrainingRdo[]>(url, headers);

    //! отладка
    console.log(data);

    return data;
  }

  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Special)
  public async getSpecial(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const url = this.apiOptions.fitServiceUrl + '/' + ServiceRoute.Trainings + '/' + TrainingRoute.Special;
    console.log(url);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<TrainingRdo[]>(url, headers);

    //! отладка
    console.log(data);

    return data;
  }

  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Popular)
  public async getPopular(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const url = this.apiOptions.fitServiceUrl + '/' + ServiceRoute.Trainings + '/' + TrainingRoute.Popular;
    console.log(url);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<TrainingRdo[]>(url, headers);

    //! отладка
    console.log(data);

    return data;
  }
}
