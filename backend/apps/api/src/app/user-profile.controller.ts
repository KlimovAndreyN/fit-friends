import {
  Body, Controller, Delete, Get, Patch, Post, UseInterceptors,
  Req, UploadedFile, UploadedFiles, UseFilters, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import 'multer'; // Express.Multer.File

import {
  ApiServiceRoute, RequestWithRequestIdAndUserId, UpdateUserProfileDto, UpdateUserDto,
  QuestionnaireRdo, CreateQuestionnaireSportsmanDto, UserProfileRoute, UserProfileRdo,
  RequestWithRequestIdAndBearerAuth, RequestWithUserId, CreateQuestionnaireCoachDto,
  AVATAR_FILE_PROPERTY, BearerAuth, DetailUserProfileRdo, parseUserAvatarFilePipeBuilder,
  UpdateQuestionnaireDto, FILES_PROPERTY, parseQuestionnaireFilesPipeBuilder, FILE_KEY,
  CertificateRdo, FileUploaderFileApiBody, parseCertificateFilePipeBuilder
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
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
    private userService: UserService,
    private fitQuestionnaireService: FitQuestionnaireService
  ) { }

  //! в описание: 200 - есть, 404 - нету
  @Get(UserProfileRoute.Questionnaires)
  public async exist(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    await this.fitQuestionnaireService.findByUserId(userId, requestId)
  }

  @UseGuards(CheckSportsmanGuard)
  @Post(UserProfileRoute.QuestionnairesSportsman)
  public async createQuestionnaireSportsman(
    @Body() dto: CreateQuestionnaireSportsmanDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    const questionnaire = await this.fitQuestionnaireService.createQuestionnaire(dto, userId, requestId);

    return questionnaire;
  }

  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckCoachGuard)
  @UseInterceptors(FilesInterceptor(FILES_PROPERTY))
  @Post(UserProfileRoute.QuestionnairesCoach)
  public async createQuestionnaireCoach(
    @Body() dto: CreateQuestionnaireCoachDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFiles(parseQuestionnaireFilesPipeBuilder) files?: Express.Multer.File[]
  ): Promise<QuestionnaireRdo> {
    const questionnaire = await this.fitQuestionnaireService.createQuestionnaire(dto, userId, requestId, files);

    return questionnaire;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploaderFileApiBody) // взял описание от загрузки файла, как и FILE_KEY
  @UseGuards(CheckCoachGuard)
  @UseInterceptors(FileInterceptor(FILE_KEY))
  @Post(UserProfileRoute.Certificates)
  public async addCoachCertificate(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseCertificateFilePipeBuilder) file: Express.Multer.File
  ): Promise<CertificateRdo> {
    //! отладка
    console.log('addCoachCertificate');
    console.log('file', file);
    console.log('requestId', requestId);
    console.log('userId', userId);

    //! временно
    const certificate: CertificateRdo = { fileId: '111112222', filePath: '3333334444', title: '4555554545' };

    return certificate;
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
    const upadteUserDto: UpdateUserDto = fillDto(UpdateUserDto, dto);
    const upadteQuestionnaireDto: UpdateQuestionnaireDto = fillDto(UpdateQuestionnaireDto, dto);

    const user = await this.userService.updateUser(upadteUserDto, avatarFile, bearerAuth, requestId);
    const questionnaire = await this.fitQuestionnaireService.updateQuestionnaire(upadteQuestionnaireDto, userId, requestId);

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
  @UseGuards(CheckSportsmanGuard)
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
