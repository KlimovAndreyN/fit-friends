import {
  BadRequestException, Body, Controller, Delete, Get, Patch,
  Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import 'multer'; // Express.Multer.File

import {
  ApiServiceRoute, RequestWithRequestIdAndUserId, ServiceRoute, UpdateUserProfileDto,
  QuestionnaireRdo, QuestionnaireRoute, CreateQuestionnaireSportsmanDto, UserProfileRoute,
  RequestWithRequestIdAndBearerAuth, RequestWithUserId, CreateQuestionnaireCoachDto,
  Role, AVATAR_FILE_PROPERTY, BearerAuth, DetailUserProfileRdo, parseUserAvatarFilePipeBuilder,
  Specialization, UpdateUserDto, UpdateQuestionnaireDto, UserProfileRdo
} from '@backend/shared/core';
import { fillDto, getValidationErrorString, joinUrl, makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckSportsmanGuard } from './guards/check-sportsman.guard';
import { CheckCoachGuard } from './guards/check-coach.guard';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@ApiTags(ApiServiceRoute.UserProfiles)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UserProfiles)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserProfileController {
  constructor(
    private readonly httpService: HttpService,
    private userService: UserService,
    private fitQuestionnaireService: FitQuestionnaireService
    //! может сделать UserProfileService ?
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

  @UseGuards(CheckSportsmanGuard)
  @Post(joinUrl(QuestionnaireRoute.Questionnaire, Role.Sportsman))
  public async createQuestionnaireSportsman(
    @Body() dto: CreateQuestionnaireSportsmanDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    const questionnaire = await this.fitQuestionnaireService.createQuestionnaire(dto, userId, requestId);

    return questionnaire;
  }

  //!@UseInterceptors(FileInterceptor(files...?)) и в клиенте поставить multipartFormData
  @UseGuards(CheckCoachGuard)
  @Post(joinUrl(QuestionnaireRoute.Questionnaire, Role.Coach))
  public async createQuestionnaireCoach(
    @Body() dto: CreateQuestionnaireCoachDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    const questionnaire = await this.fitQuestionnaireService.createQuestionnaire(dto, userId, requestId);

    return questionnaire;
  }

  @ApiResponse({ type: DetailUserProfileRdo }) //! вынести в описание
  @Get()
  public async getUserProfile(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<DetailUserProfileRdo> {
    const user = await this.userService.getDetailUser(userId, requestId);
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire };
  }

  @ApiResponse({ type: DetailUserProfileRdo }) //! вынести в описание
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(AVATAR_FILE_PROPERTY))
  @Patch()
  public async update(
    @Body() dto: UpdateUserProfileDto,
    @Req() { requestId, bearerAuth, userId }: RequestWithRequestIdAndBearerAuth & RequestWithUserId,
    @UploadedFile(parseUserAvatarFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<DetailUserProfileRdo> {
    //! перенести в сервис/сервисы?
    //! вынести преобразование и валидацю отдельно! возможно пригодится и в другом месте

    dto.specializations = [];
    for (const key in dto) {
      if (key.startsWith('specializations.')) {
        dto.specializations.push(dto[key] as Specialization);
      }
    }

    const updateDto = fillDto(UpdateUserProfileDto, dto);
    const errors = await validate(updateDto);

    if (errors.length > 0) {
      throw new BadRequestException(`Validation failed! ${getValidationErrorString(errors)}`);
    }

    const upadteUserDto: UpdateUserDto = fillDto(UpdateUserDto, updateDto);
    const upadteQuestionnaireDto: UpdateQuestionnaireDto = fillDto(UpdateQuestionnaireDto, updateDto);
    //

    const user = await this.userService.updateUser(upadteUserDto, avatarFile, bearerAuth, requestId);

    const url = this.fitQuestionnaireService.getUrl(ServiceRoute.Questionnaires);
    const headers = makeHeaders(requestId, null, userId);
    const { data: questionnaire } = await this.httpService.axiosRef.patch<QuestionnaireRdo>(url, upadteQuestionnaireDto, headers);

    return { user, questionnaire };
  }

  @Post(UserProfileRoute.ReadyForTraining)
  public async readyForTraining(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    await this.fitQuestionnaireService.updateReadyForTraining(true, userId, requestId);
  }

  @Delete(UserProfileRoute.ReadyForTraining)
  public async notReadyForTraining(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    await this.fitQuestionnaireService.updateReadyForTraining(false, userId, requestId);
  }

  @ApiResponse({ type: UserProfileRdo, isArray: true }) //! вынести в описание
  @Get(UserProfileRoute.LookForCompany)
  public async getLookForCompany(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<UserProfileRdo[]> {
    //! пока отобрал спортсменов готовых к тренировке, но нужно переработать схему... пользователя и опроскика
    //! все в обну базу: пользователи, общие опросники, опросники спортцменов и опросники тренеров
    //! может авторизацию оставить в монго, а все роли, опросники и остальное в постгресс

    const userProfiles: UserProfileRdo[] = [];
    const questionnaires = await this.fitQuestionnaireService.getReadyForTraining(userId, requestId);

    for (const { userId, specializations } of questionnaires) {
      const user = await this.userService.getDetailUser(userId, requestId);
      const { id, name, location, avatarFilePath } = user;
      const userProfile: UserProfileRdo = { id, name, location, avatarFilePath, specializations };

      userProfiles.push(userProfile);
    }

    return userProfiles;
  }
}
