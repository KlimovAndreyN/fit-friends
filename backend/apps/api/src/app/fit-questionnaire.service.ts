import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import 'multer'; // Express.Multer.File

import {
  BasicQuestionnaireRdo, CertificateRdo, CreateBasicQuestionnaireDto, ServiceRoute,
  QuestionnaireRdo, QuestionnaireRoute, UpdateQuestionnaireDto, UploadedFileRdo
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
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.Questionnaires, ...routes);
  }

  private makeCertificate(fileRdo: UploadedFileRdo): CertificateRdo {
    const { id: fileId, originalName } = fileRdo;
    const filePath = this.fileService.makePath(fileRdo);
    const title = cutExtention(originalName)
    const certificate: CertificateRdo = { fileId, filePath, title };

    return certificate;
  }

  private async getCertificates(fileIds: string[] | undefined, requestId: string): Promise<CertificateRdo[] | undefined> {
    if (!fileIds) {
      return undefined;
    }

    if (!fileIds.length) {
      return [];
    }

    const certificates: CertificateRdo[] = [];

    for (const fileId of fileIds) {
      const file = await this.fileService.getFile(fileId, requestId);
      const certificate = this.makeCertificate(file);

      certificates.push(certificate);
    }

    return certificates;
  }

  private async makeQuestionnaireRdo(rdo: BasicQuestionnaireRdo, requestId: string): Promise<QuestionnaireRdo> {
    const { fileIds, ...questionnaireFields } = rdo;
    const certificates = await this.getCertificates(fileIds, requestId);

    return { ...questionnaireFields, certificates };
  }

  public async findByUserId(userId: string, requestId: string): Promise<QuestionnaireRdo> {
    const headers = makeHeaders(requestId, null, userId);
    const { data: basicQuestionnaire } = await this.httpService.axiosRef.get<BasicQuestionnaireRdo>(this.getUrl(), headers);
    const questionnaire = await this.makeQuestionnaireRdo(basicQuestionnaire, requestId);

    return questionnaire;
  }

  public async createQuestionnaire(
    dto: CreateBasicQuestionnaireDto,
    userId: string,
    requestId: string,
    files?: Express.Multer.File[]
  ): Promise<QuestionnaireRdo> {
    const createDto: CreateBasicQuestionnaireDto = { ...dto };

    if (files) {
      createDto.fileIds = [];

      for (const file of files) {
        const { id } = await this.fileService.uploadFile(file, requestId);

        createDto.fileIds.push(id);
      }
    }

    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.post<BasicQuestionnaireRdo>(this.getUrl(), createDto, headers);
    const questionnaire = await this.makeQuestionnaireRdo(data, requestId);

    return questionnaire;
  }

  public async updateQuestionnaire(
    dto: UpdateQuestionnaireDto,
    userId: string,
    requestId: string
  ): Promise<QuestionnaireRdo> {
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.patch<BasicQuestionnaireRdo>(this.getUrl(), dto, headers);
    const questionnaire = await this.makeQuestionnaireRdo(data, requestId);

    return questionnaire;
  }

  public async addCoachCertificate(file: Express.Multer.File, userId: string, requestId: string): Promise<CertificateRdo> {
    const fileRdo = await this.fileService.uploadFile(file, requestId);

    const url = this.getUrl(QuestionnaireRoute.Files);
    const headers = makeHeaders(requestId, null, userId);
    //! нужен тип
    await this.httpService.axiosRef.post(url, { fileId: fileRdo.id }, headers);

    return this.makeCertificate(fileRdo);
  }

  public async updateCoachCertificate(fileId: string, file: Express.Multer.File, userId: string, requestId: string): Promise<CertificateRdo> {
    const fileRdo = await this.fileService.uploadFile(file, requestId);

    const url = this.getUrl(QuestionnaireRoute.Files, fileId);
    const headers = makeHeaders(requestId, null, userId);

    //! нужен тип
    await this.httpService.axiosRef.patch(url, { fileId: fileRdo.id }, headers);

    return this.makeCertificate(fileRdo);
  }

  public async deleteCoachCertificate(fileId: string, userId: string, requestId: string): Promise<void> {
    const url = this.getUrl(QuestionnaireRoute.Files, fileId);
    const headers = makeHeaders(requestId, null, userId);

    await this.httpService.axiosRef.delete(url, headers);
  }

  public async updateReadyForTraining(readyForTraining: boolean, userId: string, requestId: string): Promise<void> {
    const headers = makeHeaders(requestId, null, userId);
    const dto: UpdateQuestionnaireDto = { readyForTraining };

    await this.httpService.axiosRef.patch<QuestionnaireRdo>(this.getUrl(), dto, headers);
  }
}
