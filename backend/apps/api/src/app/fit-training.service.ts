import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  BasicDetailTrainingRdo, DetailTrainingRdo, TrainingRdo,
  RequestWithRequestIdAndUserId, ServiceRoute, UserRdo
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { UserService } from './user.service';
import { FileService } from './file.service';

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly httpService: HttpService,
    private userService: UserService,
    private readonly fileService: FileService,
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
    const user = await this.userService.getUser(coachId, requestId);
    const { id, name, avatarFilePath } = user;
    const coach: UserRdo = { id, name, avatarFilePath };

    //! временно
    const videoFilePath = 'video/sample-video-mp4.mp4';
    console.log('FitTrainingService.findById - videoFileId', videoFileId);
    //!const videoFilePath = await this.fileService.getFilePath(videoFileId, requestId);
    console.log('FitTrainingService.findById - videoFilePath', videoFilePath);
    //

    const detailTraining: DetailTrainingRdo = {
      ...training,
      videoFilePath,
      coach
    };

    return detailTraining;
  }
}
