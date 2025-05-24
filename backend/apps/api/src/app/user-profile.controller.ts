import { Controller, Get, Param, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, UserProfileRdo, UserProfileRoute, DetailUserProfileRdo,
  BearerAuth, IdParam, ApiParamOption, RequestWithRequestIdAndUser
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
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<UserProfileRdo[]> {
    const userProfiles: UserProfileRdo[] = [];
    const questionnaires = await this.fitQuestionnaireService.getReadyForTraining(sub, requestId);

    for (const { userId, specializations } of questionnaires) {
      const user = await this.userService.getDetailUser(userId, sub, role, requestId);
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
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<DetailUserProfileRdo> {
    const user = await this.userService.getDetailUser(userId, sub, role, requestId);
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire };
  }
}
