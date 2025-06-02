import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, XAllApiHeaderOptions, RequestWithRequestIdAndUserIdAndUserRole } from '@backend/shared/core';
import { InjectUserIdInterceptor, InjectUserRoleInterceptor } from '@backend/shared/interceptors';

import { FitFriendService } from './fit-friend.service';

@ApiTags(ServiceRoute.Friends)
@ApiHeaders(XAllApiHeaderOptions)
@UseInterceptors(InjectUserIdInterceptor, InjectUserRoleInterceptor)
@Controller(ServiceRoute.Friends)
export class FitFriendController {
  constructor(
    private readonly fitQuestionnaireService: FitFriendService
  ) { }

  @Get()
  public async show(@Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole): Promise<void> {
    const entity = await this.fitQuestionnaireService.findByUserId(userId);
    console.log(userId, userRole, entity);
  }
}
