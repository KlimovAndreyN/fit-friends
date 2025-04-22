import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  BasicQuestionnaireRdo, CertificateRdo, CreateBasicQuestionnaireDto, QuestionnaireMiniRdo,
  QuestionnaireRdo, ServiceRoute, UpdateQuestionnaireDto, UserProfileRoute
} from '@backend/shared/core';
import { cutExtention, joinUrl, makeHeaders } from '@backend/shared/helpers';
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

  public async getCertificates(fileIds: string[] | undefined, requestId: string): Promise<CertificateRdo[] | undefined> {
    if (!fileIds) {
      return undefined;
    }

    if (!fileIds.length) {
      return [];
    }

    const certificates: CertificateRdo[] = [];

    for (const fileId of fileIds) {
      const file = await this.fileService.getFile(fileId, requestId);
      const filePath = this.fileService.makePath(file);
      const title = cutExtention(file.originalName)
      const certificate: CertificateRdo = { fileId, filePath, title };

      certificates.push(certificate);
    }

    return certificates;
  }

  private async convertToQuestionnaireRdo(rdo: BasicQuestionnaireRdo, requestId: string): Promise<QuestionnaireRdo> {
    const { fileIds, ...fields } = rdo;
    const certificates = await this.getCertificates(fileIds, requestId);

    return { ...fields, certificates };
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

    await this.httpService.axiosRef.patch<QuestionnaireRdo>(url, dto, headers);
  }

  public async getReadyForTraining(userId: string, requestId: string): Promise<QuestionnaireMiniRdo[]> {
    const url = this.getUrl(ServiceRoute.Questionnaires, UserProfileRoute.LookForCompany);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<QuestionnaireMiniRdo[]>(url, headers);

    return data;
  }
}
