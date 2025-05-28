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
import { UserProfileService } from './user-profile.service';

@ApiTags(ApiServiceRoute.UsersProfiles)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UsersProfiles)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserProfileController {
  constructor(
    private userService: UserService,
    private fitQuestionnaireService: FitQuestionnaireService,
    private userProfileService: UserProfileService
  ) { }

  @ApiResponse({ type: UserProfileRdo, isArray: true }) //! вынести в описание
  @UseGuards(CheckRoleSportsmanGuard)
  @Get(UserProfileRoute.LookForCompany)
  public async getLookForCompany(
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<UserProfileRdo[]> {
    const userProfiles = await this.userProfileService.getReadyForTraining(sub, role, requestId); //! переделать на request

    return userProfiles;
  }

  @ApiResponse({ type: DetailUserProfileRdo }) //! вынести в описание
  @Get(IdParam.USER)
  public async show(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<DetailUserProfileRdo> {
    const user = await this.userService.getDetailUser(userId, sub, role, requestId); //! переделать на request, есть getDetailUserFromRequest
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire };
  }
}
