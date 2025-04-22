import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  CreateBasicQuestionnaireDto, QuestionnaireMiniRdo, QuestionnaireRdo,
  ServiceRoute, UpdateQuestionnaireDto, UserProfileRoute
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';
import { FileService } from './file.service';

@Injectable()
export class FitQuestionnaireService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
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

  public async createQuestionnaire(
    dto: CreateBasicQuestionnaireDto,
    userId: string,
    requestId: string,
    files?: Express.Multer.File[]
  ): Promise<QuestionnaireRdo> {
    //! проверить имена файлов на русском языке

    const createDto: CreateBasicQuestionnaireDto = { ...dto };

    if (files) {
      createDto.fileIds = [];

      for (const file of files) {
        const { id } = await this.fileService.uploadFile(file, requestId);

        createDto.fileIds.push(id);
      }
    }

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
