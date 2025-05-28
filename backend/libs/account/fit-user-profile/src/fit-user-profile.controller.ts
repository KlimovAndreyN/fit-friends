import { Controller, Get, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, XAllApiHeaderOptions, BasicUserProfileRdo, UserProfileRoute,
  RequestWithRequestIdAndUserIdAndUserRole, UserProfileQuery, UsersProfilesWithPaginationRdo
} from '@backend/shared/core';
import { InjectUserIdInterceptor, InjectUserRoleInterceptor } from '@backend/shared/interceptors';

import { FitUserProfileService } from './fit-user-profile.service';

//! добавить описание
@ApiTags(ServiceRoute.UsersProfiles)
@ApiHeaders(XAllApiHeaderOptions)
@UseInterceptors(InjectUserIdInterceptor)
@Controller(ServiceRoute.UsersProfiles)
export class FitUserProfileController {
  constructor(
    private readonly fitUserProfileService: FitUserProfileService
  ) { }

  @ApiResponse({ type: UsersProfilesWithPaginationRdo, isArray: true })
  @UseInterceptors(InjectUserRoleInterceptor)
  @Get()
  public async index(
    @Query() query: UserProfileQuery,
    @Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<UsersProfilesWithPaginationRdo> {
    const data = await this.fitUserProfileService.find(userId, query, userRole);

    return data;
  }

  @ApiResponse({ type: BasicUserProfileRdo, isArray: true })
  @UseInterceptors(InjectUserRoleInterceptor)
  @Get(UserProfileRoute.LookForCompany)
  public async getReadyForTraining(@Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole): Promise<BasicUserProfileRdo[]> {
    const usersProfiles = await this.fitUserProfileService.getReadyForTraining(userId, userRole);

    return usersProfiles;
  }
}
