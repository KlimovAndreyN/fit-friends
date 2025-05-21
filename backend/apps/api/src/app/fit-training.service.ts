import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import {
  BasicDetailTrainingRdo, DetailTrainingRdo, ServiceRoute, CreateTrainingDto,
  RequestWithRequestIdAndUser, CreateBasicTrainingDto, TrainingRdo,
  Duration, Gender, Specialization, TrainingLevel, Role
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

  private convertToTrainingRdo(rdo: BasicDetailTrainingRdo): TrainingRdo {
    const { id, title, description, specialization, caloriesWaste, price, backgroundPath, isSpecial, rating, createdDate } = rdo;
    const training: TrainingRdo = { id, title, description, specialization, caloriesWaste, price, backgroundPath, isSpecial, rating, createdDate };

    return training;
  }

  private async convertToDetailTrainingRdo(rdo: BasicDetailTrainingRdo, videoFilePath: string, userRole: Role, requestId: string): Promise<DetailTrainingRdo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, videoFileId, ...fields } = rdo;
    const coach = await this.userService.getUser(userId, '', requestId); //! Убрать авторизацию и добавить userRole перед requestId
    const detailTrainingRdo: DetailTrainingRdo = { ...fields, videoFilePath, coach };

    return detailTrainingRdo;
  }

  public async getTrainings<T>(route: string, { user: { sub: userId, role: userRole }, requestId }: RequestWithRequestIdAndUser): Promise<T> {
    const url = this.getUrl(route);
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.get<T>(url, headers);

    return data;
  }

  public async findById(
    trainingId: string,
    userId: string,
    userRole: Role,
    requestId: string
  ): Promise<DetailTrainingRdo> {
    const url = this.getUrl(trainingId);
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.get<BasicDetailTrainingRdo>(url, headers);
    const videoFilePath = await this.fileService.getFilePath(data.videoFileId, requestId);

    return await this.convertToDetailTrainingRdo(data, videoFilePath, userRole, requestId);
  }

  public async update(
    dto: CreateTrainingDto, //! будет UpdateTrainingDto
    file: Express.Multer.File,
    userId: string,
    userRole: Role,
    requestId: string
  ): Promise<DetailTrainingRdo> {
    //! временно! переделать для обновления!
    // старый видео-файл удалить... а как с аватаром? есть удаление?
    const { id: videoFileId } = await this.fileService.uploadFile(file, requestId);
    const createDto: CreateBasicTrainingDto = { ...dto, videoFileId };
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.post<BasicDetailTrainingRdo>(this.getUrl(), createDto, headers);
    //const detailTraining: DetailTrainingRdo = await this.convertToDetailTrainingRdo(data, bearerAuth, requestId);
    //! временно
    const detailTraining: DetailTrainingRdo = { backgroundPath: (data) ? '' : '', caloriesWaste: 0, coach: { id: '', name: '', avatarFilePath: '' }, createdDate: '', description: '', duration: Duration.Minutes_10_30, gender: Gender.Female, id: '', isSpecial: false, price: 0, rating: 0, specialization: Specialization.Aerobics, title: '', trainingLevel: TrainingLevel.Amateur, videoFilePath: '' };

    return detailTraining;
  }

  public async create(
    dto: CreateTrainingDto,
    file: Express.Multer.File,
    userId: string,
    userRole: Role,
    requestId: string
  ): Promise<TrainingRdo> {
    const { id: videoFileId } = await this.fileService.uploadFile(file, requestId);
    const createDto: CreateBasicTrainingDto = { ...dto, videoFileId };
    const headers = makeHeaders(requestId, null, userId, userRole);
    const { data } = await this.httpService.axiosRef.post<BasicDetailTrainingRdo>(this.getUrl(), createDto, headers);

    return this.convertToTrainingRdo(data);
  }
}
