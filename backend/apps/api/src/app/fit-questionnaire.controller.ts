import { Controller, Get, Inject, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import { BearerAuth, ApiServiceRoute, QuestionnaireRoute, ServiceRoute, RequestWithRequestIdAndUserId } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { apiConfig } from '@backend/api/config';

import { FitService } from './fit.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.FitQuestionnaires)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.FitQuestionnaires)
@UseFilters(AxiosExceptionFilter)
export class FitQuestionnaireController {
  constructor(
    private readonly httpService: HttpService,
    private readonly fitService: FitService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  @UseGuards(CheckAuthGuard)
  @Get(QuestionnaireRoute.Exist)
  public async existQuestionnaire(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    const url = this.fitService.getUrl(ServiceRoute.Questionnaire, QuestionnaireRoute.Exist, userId);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<boolean>(url, headers);

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Post()
  public async createQuestionnaire(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    const url = this.fitService.getUrl(ServiceRoute.Questionnaire, QuestionnaireRoute.Exist, userId);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<boolean>(url, headers);

    return data;
  }
}
