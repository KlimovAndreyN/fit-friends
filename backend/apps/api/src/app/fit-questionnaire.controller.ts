import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

import { BearerAuth, ApiServiceRoute, QuestionnaireRoute, ServiceRoute, RequestWithRequestIdAndUserId, CreateQuestionnaireDto, QuestionnaireRdo } from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { FitService } from './fit.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.FitQuestionnaires)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.FitQuestionnaires)
@UseFilters(AxiosExceptionFilter)
export class FitQuestionnaireController {
  constructor(
    private readonly httpService: HttpService,
    private readonly fitService: FitService
  ) { }

  @UseGuards(CheckAuthGuard)
  @Get(QuestionnaireRoute.Exist)
  public async exist(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    //! findQuestionnaireByUserId
    const existQuestionnaire = await this.fitService.existQuestionnaire(userId, requestId);

    return existQuestionnaire;
  }

  @UseGuards(CheckAuthGuard)
  @Post()
  public async create(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @Body() dto: CreateQuestionnaireDto
  ): Promise<QuestionnaireRdo> {
    //! когда будет роль тренер нужно загрузить файлы и конвернтнуть в CreateQuestionnaireWithFileIdsDto
    const url = this.fitService.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.post<QuestionnaireRdo>(url, dto, headers);

    //! когда будет роль тренер нужно преобразовать id файлов в пути
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get()
  public async show(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    //! findQuestionnaireByUserId
    const url = this.fitService.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<boolean>(url, headers);

    return data;
  }
}
