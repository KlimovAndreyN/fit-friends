import { Controller, Get, Inject, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';

import {
  ApiParamOption, BearerAuth, ApiServiceRoute,
  QuestionnaireRoute, ServiceRoute, RequestWithRequestIdAndUserId
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { apiConfig } from '@backend/api/config';

import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.FitQuestionnaires)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.FitQuestionnaires)
@UseFilters(AxiosExceptionFilter)
export class FitQuestionnaireController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  @UseGuards(CheckAuthGuard)
  @ApiParam(ApiParamOption.UserId)
  @Get(QuestionnaireRoute.Exist)
  public async existQuestionnaire(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    console.log('existQuestionnaire');
    console.log('userId', userId);
    const url = joinUrl(this.apiOptions.fitServiceUrl, ServiceRoute.Questionnaire, QuestionnaireRoute.Exist, userId);
    console.log('url', url);
    const headers = makeHeaders(requestId);
    console.log('headers', headers);
    const { data } = await this.httpService.axiosRef.get<boolean>(url, headers);

    return data;
  }
}
