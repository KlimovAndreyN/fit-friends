import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  BasicQuestionnaireRdo, CreateBasicQuestionnaireDto, QuestionnaireMiniRdo,
  QuestionnaireRdo, ServiceRoute, UpdateQuestionnaireDto, UserProfileRoute
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

  private getUrl(...routes: string[]): string {
    return joinUrl(this.apiOptions.fitServiceUrl, ...routes);
  }

  private async convertToQuestionnaireRdo(rdo: BasicQuestionnaireRdo, requestId: string): Promise<QuestionnaireRdo> {
    const { fileIds, ...fields } = rdo;
    const filePaths = await this.fileService.getFilePaths(fileIds, requestId);

    return { ...fields, filePaths };
  }

  public async findByUserId(userId: string, requestId: string): Promise<QuestionnaireRdo> {
    const url = this.getUrl(ServiceRoute.Questionnaires);
    const headers = makeHeaders(requestId, null, userId);
    const { data: basicQuestionnaire } = await this.httpService.axiosRef.get<BasicQuestionnaireRdo>(url, headers);
    const questionnaire = await this.convertToQuestionnaireRdo(basicQuestionnaire, requestId);

    return questionnaire;
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
    const { data } = await this.httpService.axiosRef.post<BasicQuestionnaireRdo>(url, createDto, headers);
    const questionnaire = await this.convertToQuestionnaireRdo(data, requestId);

    return questionnaire;
  }

  public async updateQuestionnaire(
    dto: UpdateQuestionnaireDto,
    userId: string,
    requestId: string
  ): Promise<QuestionnaireRdo> {
    const url = this.getUrl(ServiceRoute.Questionnaires);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.patch<BasicQuestionnaireRdo>(url, dto, headers);
    const questionnaire = await this.convertToQuestionnaireRdo(data, requestId);

    return questionnaire;
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
