import { Body, Controller, Delete, Get, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  BearerAuth, ApiServiceRoute, RequestWithRequestIdAndUserId, ServiceRoute, UpdateUserInfoDto,
  QuestionnaireRdo, QuestionnaireRoute, CreateQuestionnaireSportsmanDto, UserInfoRoute, UserInfoRdo,
  UserRole, RequestWithRequestIdAndBearerAuth, RequestWithUserId, CreateQuestionnaireWithFileIdsDto
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { UsersService } from './users.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@ApiTags(ApiServiceRoute.UserInfo)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UserInfo)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserInfoController {
  constructor(
    private readonly httpService: HttpService,
    private usersService: UsersService,
    private fitQuestionnaireService: FitQuestionnaireService
  ) { }

  @Get(QuestionnaireRoute.Exist)
  //! может дополнять при входе и при проверке токена
  //! или коды ответов сделать разные
  //! или на клиенте обработать 404 без олтображения ошибки
  public async exist(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    const existQuestionnaire = await this.fitQuestionnaireService.exist(userId, requestId);

    return existQuestionnaire;
  }

  @Post(joinUrl(QuestionnaireRoute.Questionnaire, UserRole.Sportsman))
  public async create(
    @Body() dto: CreateQuestionnaireSportsmanDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    //! проверить роль пользователя узнав через запрос от Sub или отдельно добавить через guard как и userId на UserRole.Sportsman
    //! нужна функция пригодиться для тренера, а может где еще
    //! CheckAuthGuard складывает в request[RequestProperty.User] = data {sub, name, role....};
    //! может сделать RequestWithUser...
    const createDto: CreateQuestionnaireWithFileIdsDto = { ...dto };
    //! когда будет роль тренер нужно загрузить файлы и конвернтнуть в - fileIds: []
    //! можно сразу вызвать проверку исходную дто заполеннности полей в зависимости от роли
    //! перенести в сервис?
    const url = this.fitQuestionnaireService.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.post<QuestionnaireRdo>(url, createDto, headers);

    //! когда будет роль тренер нужно преобразовать id файлов в пути
    return data;
  }

  //!@UseInterceptors(FileInterceptor(files...?)) и в клиенте поставить multipartFormData
  //@Post(joinUrl(QuestionnaireRoute.Questionnaire, UserRole.Coach))
  //! проверить роль пользователя узнав через запрос от Sub или отдельно добавить через guard как и userId на UserRole.Coach


  @ApiResponse({ type: UserInfoRdo }) //! вынести в описание
  @Get()
  public async getUserInfo(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<UserInfoRdo> {
    const user = await this.usersService.getUser(userId, requestId);
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire };
  }

  @ApiResponse({ type: UserInfoRdo }) //! вынести в описание
  @Patch()
  public async update(
    @Body() dto: UpdateUserInfoDto,
    @Req() { requestId, bearerAuth, userId }: RequestWithRequestIdAndBearerAuth & RequestWithUserId
  ): Promise<UserInfoRdo> {
    //! когда будет роль тренер нужно загрузить файлы и конвернтнуть в CreateQuestionnaireWithFileIdsDto
    //! перенести в сервис/сервисы?
    //! отладка
    console.log('UserInfoController - update - dto', dto);

    const user = await this.usersService.updateUser(dto.user, null, bearerAuth, requestId);

    const url = this.fitQuestionnaireService.getUrl(ServiceRoute.Questionnaire);
    const headers = makeHeaders(requestId, null, userId);
    const { data: questionnaire } = await this.httpService.axiosRef.patch<QuestionnaireRdo>(url, dto.questionnaire, headers);

    const userInfoRdo: UserInfoRdo = { user, questionnaire };

    //! отладка
    console.log('UserInfoController - update - userInfoRdo', userInfoRdo);

    //! когда будет роль тренер нужно преобразовать id файлов в пути
    return userInfoRdo;
  }

  @Post(UserInfoRoute.ReadyForTraining)
  public async readyForTraining(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    await this.fitQuestionnaireService.updateReadyForTraining(true, userId, requestId);
  }

  @Delete(UserInfoRoute.ReadyForTraining)
  public async notReadyForTraining(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    await this.fitQuestionnaireService.updateReadyForTraining(false, userId, requestId);
  }
}
