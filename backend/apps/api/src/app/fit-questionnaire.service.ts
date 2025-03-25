import { HttpStatus, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';

import { QuestionnaireRdo, ServiceRoute } from '@backend/shared/core';
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
    const url = this.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
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

  public async updateReadyForTraining(readyForTraining: boolean, userId: string, requestId: string): Promise<void> {
    //! отладка
    console.log('readyForTraining - readyForTraining', readyForTraining);
    console.log('readyForTraining - userId', userId);

    const url = this.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.patch<QuestionnaireRdo>(url, { readyForTraining }, headers);
    //!
    console.log('readyForTraining', readyForTraining);
    console.log('data', data);
  }
}
