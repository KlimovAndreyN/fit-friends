import { HttpStatus, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';

import { ServiceRoute } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FitService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getUrl(...routes: string[]): string {
    return joinUrl(this.apiOptions.fitServiceUrl, ...routes);
  }

  //! findQuestionnaireByUserId
  public async existQuestionnaire(userId: string, requestId: string): Promise<boolean> {
    const url = this.getUrl(ServiceRoute.Questionnaire, userId);
    const headers = makeHeaders(requestId);

    try {
      const { data } = await this.httpService.axiosRef.get<boolean>(url, headers);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== HttpStatus.NOT_FOUND) {
          return false;
        }
      }

      Logger.log('Error check exist questionnaire', FitService.name);
      throw new InternalServerErrorException('Error check exist questionnaire');
    }
  }
}
