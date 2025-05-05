import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import {
  BasicDetailTrainingRdo, DetailTrainingRdo, ServiceRoute, UserRdo,
  RequestWithRequestIdAndBearerAuthAndUser, CreateTrainingDto,
  RequestWithRequestIdAndUser, CreateBasicTrainingDto
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


  private async convertToDetailTrainingRdo(rdo: BasicDetailTrainingRdo, bearerAuth: string, requestId: string): Promise<DetailTrainingRdo> {
    const { userId, videoFileId, ...fields } = rdo;
    const videoFilePath = await this.fileService.getFilePath(videoFileId, requestId);
    const user = await this.userService.getDetailUser(userId, bearerAuth, requestId); //! при создании нет смысла...
    const { id, name, avatarFilePath } = user;
    const coach: UserRdo = { id, name, avatarFilePath };

    return { ...fields, videoFilePath, coach };
  }

  public async getTrainings<T>(route: string, { user: { sub: userId, role: userRole }, requestId }: RequestWithRequestIdAndUser): Promise<T> {
    const url = this.getUrl(route);
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.get<T>(url, headers);

    return data;
  }

  public async findById(
    trainingId: string,
    { requestId, bearerAuth, user: { sub: userId, role: userRole } }: RequestWithRequestIdAndBearerAuthAndUser
  ): Promise<DetailTrainingRdo> {
    const url = this.getUrl(trainingId);
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.get<BasicDetailTrainingRdo>(url, headers);
    const detailTraining: DetailTrainingRdo = await this.convertToDetailTrainingRdo(data, bearerAuth, requestId);

    return detailTraining;
  }

  public async create(
    dto: CreateTrainingDto,
    file: Express.Multer.File,
    request: RequestWithRequestIdAndBearerAuthAndUser
  ): Promise<DetailTrainingRdo> {
    const { requestId, bearerAuth, user: { sub: userId, role: userRole } } = request;
    const { id: videoFileId } = await this.fileService.uploadFile(file, requestId);
    const createDto: CreateBasicTrainingDto = { ...dto, videoFileId };
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.post<BasicDetailTrainingRdo>(this.getUrl(), createDto, headers);
    const detailTraining: DetailTrainingRdo = await this.convertToDetailTrainingRdo(data, bearerAuth, requestId);
    console.log('detailTraining', detailTraining);

    return detailTraining;
  }
}
