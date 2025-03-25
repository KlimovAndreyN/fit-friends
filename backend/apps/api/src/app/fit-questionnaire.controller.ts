import { Body, Controller, Get, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';

import {
  BearerAuth, ApiServiceRoute, QuestionnaireRoute, ServiceRoute, CreateQuestionnaireWithFileIdsDto,
  RequestWithRequestIdAndUserId, CreateQuestionnaireDto, QuestionnaireRdo, UserRole
} from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { FitService } from './fit.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.FitQuestionnaires)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.FitQuestionnaires)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitQuestionnaireController {
  constructor(
    private readonly httpService: HttpService,
    private readonly fitService: FitService
  ) { }

  @Get(QuestionnaireRoute.Exist)
  public async exist(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    const existQuestionnaire = await this.fitService.existQuestionnaire(userId, requestId);

    return existQuestionnaire;
  }

  //!@UseInterceptors(FileInterceptor(files...?)) и в клиенте поставить multipartFormData
  @Post()
  public async create(
    @Body() dto: CreateQuestionnaireDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    //! подкинуть роль пользователя узнав через запрос от Sub или отдельно добавить через guard как и userId
    //! временно
    const createDto: CreateQuestionnaireWithFileIdsDto = { ...dto, userRole: UserRole.Sportsman, fileIds: [] }
    //! когда будет роль тренер нужно загрузить файлы и конвернтнуть в CreateQuestionnaireWithFileIdsDto
    //! можно сразу вызвать проверку исходную дпо заполеннности полей в зависимости от роли
    const url = this.fitService.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.post<QuestionnaireRdo>(url, createDto, headers);

    //! когда будет роль тренер нужно преобразовать id файлов в пути
    return data;
  }

  @Get()
  public async show(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    const data = this.fitService.findQuestionnaireByUserId(userId, requestId);

    return data;
  }
}
