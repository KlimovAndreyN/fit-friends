import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, BearerAuth, UserProfileRdo, UserProfileRoute,
  DetailUserProfileRdo, RequestWithRequestIdAndBearerAuth, IdParam,
  RequestWithRequestIdAndBearerAuthAndUserId, ApiParamOption
} from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@ApiTags(ApiServiceRoute.UsersProfiles)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UsersProfiles)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserProfileController {
  constructor(
    private userService: UserService,
    private fitQuestionnaireService: FitQuestionnaireService
  ) { }

  @ApiResponse({ type: UserProfileRdo, isArray: true }) //! вынести в описание
  @UseGuards(CheckRoleSportsmanGuard)
  @Get(UserProfileRoute.LookForCompany)
  public async getLookForCompany(
    @Req() { requestId, bearerAuth, userId }: RequestWithRequestIdAndBearerAuthAndUserId
  ): Promise<UserProfileRdo[]> {
    //! пока отобрал спортсменов готовых к тренировке, но нужно переработать схему... пользователя и опроскика
    //! все в обну базу: пользователи, общие опросники, опросники спортцменов и опросники тренеров
    //! может авторизацию оставить в монго, а все роли, опросники и остальное в постгресс

    const userProfiles: UserProfileRdo[] = [];
    const questionnaires = await this.fitQuestionnaireService.getReadyForTraining(userId, requestId);

    for (const { userId, specializations } of questionnaires) {
      const user = await this.userService.getDetailUser(userId, bearerAuth, requestId);
      const { id, name, location, avatarFilePath } = user;
      const userProfile: UserProfileRdo = { id, name, location, avatarFilePath, specializations };

      userProfiles.push(userProfile);
    }

    return userProfiles;
  }

  @ApiResponse({ type: DetailUserProfileRdo }) //! вынести в описание
  @Get(IdParam.USER)
  public async show(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth
  ): Promise<DetailUserProfileRdo> {
    const user = await this.userService.getDetailUser(userId, bearerAuth, requestId);
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire };
  }
}
