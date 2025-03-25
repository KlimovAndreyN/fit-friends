import { Controller, Delete, Get, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, RequestWithRequestIdAndUserId, UserInfoRdo, UserInfoRoute } from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { UsersService } from './users.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.UserInfo)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UserInfo)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserInfoController {
  constructor(
    private usersService: UsersService,
    private fitQuestionnaireService: FitQuestionnaireService
  ) { }

  @Get()
  public async getUserInfo(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<UserInfoRdo> {
    const user = await this.usersService.getUser(userId, requestId);
    const questionnaire = await this.fitQuestionnaireService.findQuestionnaireByUserId(userId, requestId);

    return { user, questionnaire };
  }

  @Post(UserInfoRoute.ReadyForTraining)
  public async readyForTraining(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    const user = await this.usersService.getUser(userId, requestId);
    //! отладка
    console.log('readyForTraining - user', user);
  }

  @Delete(UserInfoRoute.ReadyForTraining)
  public async notReadyForTraining(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<void> {
    const user = await this.usersService.getUser(userId, requestId);
    //! отладка
    console.log('notReadyForTraining - user', user);
  }
}
