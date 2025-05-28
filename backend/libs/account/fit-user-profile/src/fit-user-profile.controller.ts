import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, XAllApiHeaderOptions, BasicUserProfileRdo,
  RequestWithRequestIdAndUserIdAndUserRole, UserProfileRoute
} from '@backend/shared/core';
import { InjectUserIdInterceptor, InjectUserRoleInterceptor } from '@backend/shared/interceptors';

import { FitUserProfileService } from './fit-user-profile.service';

@ApiTags(ServiceRoute.UsersProfiles)
@ApiHeaders(XAllApiHeaderOptions)
@UseInterceptors(InjectUserIdInterceptor)
@Controller(ServiceRoute.UsersProfiles)
export class FitUserProfileController {
  constructor(
    private readonly fitUserProfileService: FitUserProfileService
  ) { }

  //! добавить описание
  @ApiResponse({ type: BasicUserProfileRdo, isArray: true })
  @UseInterceptors(InjectUserRoleInterceptor)
  @Get(UserProfileRoute.LookForCompany)
  public async getReadyForTraining(@Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole): Promise<BasicUserProfileRdo[]> {
    const usersProfiles = await this.fitUserProfileService.getReadyForTraining(userId, userRole);

    return usersProfiles;
  }
}
