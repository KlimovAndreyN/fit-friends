import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  BasicDetailTrainingRdo, DetailTrainingRdo, TrainingRdo,
  RequestWithRequestIdAndUserId, ServiceRoute, UserRdo
} from '@backend/shared/core';
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

  public async findById(trainingId: string, { userId, requestId }: RequestWithRequestIdAndUserId): Promise<DetailTrainingRdo> {
    const url = this.getUrl(trainingId);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<BasicDetailTrainingRdo>(url, headers);
    const { userId: coachId, videoFileId, ...training } = data;
    const coach: UserRdo = { id: coachId, name: 'namamama', avatarFilePath: 'asdasdasdasdasd' } //! временно
    const videoFilePath = 'ssss/' + videoFileId; //! временно

    const detailTraining: DetailTrainingRdo = {
      ...training,
      videoFilePath,
      coach
    };

    return detailTraining;
  }
}
