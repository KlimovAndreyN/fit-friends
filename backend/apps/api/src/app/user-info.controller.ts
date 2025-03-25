import { Controller, Get, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BearerAuth, ApiServiceRoute, ApiRoute, RequestWithRequestIdAndUserId, UserInfoRdo } from '@backend/shared/core';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { UsersService } from './users.service';
import { FitService } from './fit.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.UserInfo)
@Controller(ApiServiceRoute.UserInfo)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserInfoController {
  constructor(
    private usersService: UsersService,
    private fitService: FitService
  ) { }

  @ApiBearerAuth(BearerAuth.AccessToken)
  @Get()
  public async getUserInfo(@Req() { requestId, userId }: RequestWithRequestIdAndUserId): Promise<UserInfoRdo> {
    const user = await this.usersService.getUser(userId, requestId);
    const questionnaire = await this.fitService.findQuestionnaireByUserId(userId, requestId);

    return { user, questionnaire };
  }
}
