import { HttpStatus, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';

import {
  CreateBasicQuestionnaireDto, QuestionnaireMiniRdo, QuestionnaireRdo,
  ServiceRoute, UpdateQuestionnaireDto, UserProfileRoute
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FitQuestionnaireService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getUrl(...routes: string[]): string {
    return joinUrl(this.apiOptions.fitServiceUrl, ...routes);
  }

  public async findByUserId(userId: string, requestId: string): Promise<QuestionnaireRdo> {
    const url = this.getUrl(ServiceRoute.Questionnaires);
    const headers = makeHeaders(requestId, null, userId);
    //! отдает BasicQuestionnaireRdo
    const { data } = await this.httpService.axiosRef.get<QuestionnaireRdo>(url, headers);

    return data;
  }

  public async exist(userId: string, requestId: string): Promise<boolean> {
    try {
      await this.findByUserId(userId, requestId);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === HttpStatus.NOT_FOUND) {
          return false;
        }
      }

      Logger.log('Error check exist questionnaire', FitQuestionnaireService.name);
      throw new InternalServerErrorException('Error check exist questionnaire');
    }
  }

  public async createQuestionnaire(dto: CreateBasicQuestionnaireDto, userId: string, requestId: string): Promise<QuestionnaireRdo> {
    //! признак тренера можно передать, а можно проще если есть файлы, то нужно обработать, возможно будет отдельная переменая, массив...
    //! у тренера нужно загрузить файлы и конвернтнуть в - fileIds: []
    //! у тренера нужно преобразовать id файлов в пути

    const createDto: CreateBasicQuestionnaireDto = { ...dto };
    const url = this.getUrl(ServiceRoute.Questionnaires);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.post<QuestionnaireRdo>(url, createDto, headers);

    return data;
  }

  public async updateReadyForTraining(readyForTraining: boolean, userId: string, requestId: string): Promise<void> {
    const url = this.getUrl(ServiceRoute.Questionnaires);
    const headers = makeHeaders(requestId, null, userId);
    const dto: UpdateQuestionnaireDto = { readyForTraining };

    //! отдает BasicQuestionnaireRdo
    await this.httpService.axiosRef.patch<QuestionnaireRdo>(url, dto, headers);
  }

  public async getReadyForTraining(userId: string, requestId: string): Promise<QuestionnaireMiniRdo[]> {
    const url = this.getUrl(ServiceRoute.Questionnaires, UserProfileRoute.LookForCompany);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<QuestionnaireMiniRdo[]>(url, headers);

    return data;
  }

}
