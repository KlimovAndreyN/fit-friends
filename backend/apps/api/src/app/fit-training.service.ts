import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { RequestWithRequestIdAndUserId, ServiceRoute, TrainingRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  private getUrl(route = ''): string {
    return joinUrl(this.apiOptions.fitServiceUrl, ServiceRoute.Trainings, route);
  }

  public async getTrainings(route: string, { userId, requestId }: RequestWithRequestIdAndUserId): Promise<TrainingRdo[]> {
    const url = this.getUrl(route);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<TrainingRdo[]>(url, headers);

    return data;
  }
}
