import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  ServiceRoute, RequestWithRequestIdAndUser, UpdateTrainingRequestDto,
  CreateTrainingRequestDto, TrainingRequestRdo, TrainingRequestRoute
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FitTrainingRequestService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  private getUrl(...routes: string[]): string {
    return joinUrl(this.apiOptions.fitServiceUrl, ServiceRoute.TrainingsRequests, ...routes);
  }

  public async create(
    dto: CreateTrainingRequestDto,
    { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<TrainingRequestRdo> {
    const url = this.getUrl();
    const headers = makeHeaders(requestId, null, sub, role);
    const { data } = await this.httpService.axiosRef.post<TrainingRequestRdo>(url, dto, headers);

    return data;
  }

  public async update(
    dto: UpdateTrainingRequestDto,
    trainingRequestId: string,
    userId: string,
    requestId: string
  ): Promise<TrainingRequestRdo> {
    const url = this.getUrl(trainingRequestId);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.patch<TrainingRequestRdo>(url, dto, headers);

    return data;
  }

  public async find(initiatorId: string, userId: string, requestId: string): Promise<TrainingRequestRdo> {
    const url = this.getUrl(TrainingRequestRoute.FindToUser, userId);
    const headers = makeHeaders(requestId, null, initiatorId);
    try {
      const { data } = await this.httpService.axiosRef.get<TrainingRequestRdo>(url, headers);

      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return undefined;
    }
  }
}
