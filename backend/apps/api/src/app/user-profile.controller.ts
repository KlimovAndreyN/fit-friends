import { Controller, Get, Param, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, UserProfileRdo, UserProfileRoute, DetailUserProfileRdo,
  BearerAuth, IdParam, ApiParamOption, RequestWithRequestIdAndUser,
  UsersProfilesWithPaginationRdo,
  UserProfileQuery
} from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';
import { UserProfileService } from './user-profile.service';

//! Добавить описание
@ApiTags(ApiServiceRoute.UsersProfiles)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UsersProfiles)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly fitQuestionnaireService: FitQuestionnaireService,
    private readonly userProfileService: UserProfileService
  ) { }

  @ApiResponse({ type: UserProfileRdo, isArray: true })
  @UseGuards(CheckRoleSportsmanGuard)
  @Get()
  public async index(
    @Query() query: UserProfileQuery,
    @Req() request: RequestWithRequestIdAndUser
  ): Promise<UsersProfilesWithPaginationRdo> {
    const data = await this.userProfileService.find(request, query);

    return data;
  }

  @ApiResponse({ type: UserProfileRdo, isArray: true })
  @UseGuards(CheckRoleSportsmanGuard)
  @Get(UserProfileRoute.LookForCompany)
  public async getLookForCompany(@Req() request: RequestWithRequestIdAndUser): Promise<UserProfileRdo[]> {
    const userProfiles = await this.userProfileService.getReadyForTraining(request);

    return userProfiles;
  }

  @ApiResponse({ type: DetailUserProfileRdo })
  @Get(IdParam.USER)
  public async show(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<DetailUserProfileRdo> {
    const user = await this.userService.getDetailUser(userId, sub, role, requestId);
    const questionnaire = await this.fitQuestionnaireService.findByUserId(userId, requestId);

    return { user, questionnaire, isFriend: false/* //! временно */ };
  }
}
