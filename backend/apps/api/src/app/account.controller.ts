import {
  Body, Controller, Delete, Get, Patch, Post, UseInterceptors,
  Req, UploadedFile, UploadedFiles, UseFilters, UseGuards, Param
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import 'multer'; // Express.Multer.File

import {
  ApiServiceRoute, RequestWithRequestIdAndUserId, UpdateAccountInfoDto, QuestionnaireRdo,
  CreateQuestionnaireSportsmanDto, UserProfileRoute, ApiParamOption, AccountInfoRdo,
  RequestWithRequestIdAndBearerAuth, RequestWithUserId, CreateQuestionnaireCoachDto,
  AVATAR_FILE_PROPERTY, BearerAuth, parseUserAvatarFilePipeBuilder, FILES_PROPERTY,
  parseQuestionnaireFilesPipeBuilder, CertificateRdo, FileUploaderFileApiBody,
  parseCertificateFilePipeBuilder, IdParam, FILE_KEY, RequestWithRequestIdAndUser,
  UpdateUserDto, UpdateQuestionnaireDto
} from '@backend/shared/core';
import { fillDto, joinUrl } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { MongoIdValidationPipe } from '@backend/shared/pipes';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
import { CheckRoleCoachGuard } from './guards/check-role-coach.guard';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@ApiTags(ApiServiceRoute.UsersProfiles)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.Accounts)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class AccountController {
  constructor(
    private readonly userService: UserService,
    private readonly fitQuestionnaireService: FitQuestionnaireService,
  ) { }

  //! в описание: 200 - есть, 404 - нету
  @Get(UserProfileRoute.Questionnaires)
  public async exist(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    await this.fitQuestionnaireService.findByUserId(userId, requestId)
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @Post(UserProfileRoute.QuestionnairesSportsman)
  public async createQuestionnaireSportsman(
    @Body() dto: CreateQuestionnaireSportsmanDto,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<QuestionnaireRdo> {
    const questionnaire = await this.fitQuestionnaireService.createQuestionnaire(dto, userId, requestId);

    return questionnaire;
  }

  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckRoleCoachGuard)
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
  @UseGuards(CheckRoleCoachGuard)
  @UseInterceptors(FileInterceptor(FILE_KEY))
  @Post(UserProfileRoute.Certificates)
  public async addCoachCertificate(
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseCertificateFilePipeBuilder) file: Express.Multer.File
  ): Promise<CertificateRdo> {
    const certificate = await this.fitQuestionnaireService.addCoachCertificate(file, userId, requestId);

    return certificate;
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploaderFileApiBody) // взял описание от загрузки файла, как и FILE_KEY
  @UseGuards(CheckRoleCoachGuard)
  @UseInterceptors(FileInterceptor(FILE_KEY))
  @Patch(joinUrl(UserProfileRoute.Certificates, IdParam.FILE))
  public async updateCoachCertificate(
    @Param(ApiParamOption.FileId.name, MongoIdValidationPipe) fileId: string,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId,
    @UploadedFile(parseCertificateFilePipeBuilder) file: Express.Multer.File
  ): Promise<CertificateRdo> {
    const certificate = await this.fitQuestionnaireService.updateCoachCertificate(fileId, file, userId, requestId);

    return certificate;
  }

  @UseGuards(CheckRoleCoachGuard)
  @Delete(joinUrl(UserProfileRoute.Certificates, IdParam.FILE))
  public async deleteCoachCertificate(
    @Param(ApiParamOption.FileId.name, MongoIdValidationPipe) fileId: string,
    @Req() { requestId, userId }: RequestWithRequestIdAndUserId
  ): Promise<void> {
    await this.fitQuestionnaireService.deleteCoachCertificate(fileId, userId, requestId);
  }

  @ApiResponse({ type: AccountInfoRdo }) //! вынести в описание
  @Get()
  public async getAccountInfo(@Req() request: RequestWithRequestIdAndUser): Promise<AccountInfoRdo> {
    const user = await this.userService.getDetailUserFromRequest(request);
    const { user: { sub: userId }, requestId } = request;
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire };
  }

  @ApiResponse({ type: AccountInfoRdo }) //! вынести в описание
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(AVATAR_FILE_PROPERTY))
  @Patch()
  public async update(
    @Body() dto: UpdateAccountInfoDto,
    @Req() { requestId, bearerAuth, userId }: RequestWithRequestIdAndBearerAuth & RequestWithUserId,
    @UploadedFile(parseUserAvatarFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<AccountInfoRdo> {
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
}
