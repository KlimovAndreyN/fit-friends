import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, IdParam, UserProfileRoute, DetailUserProfileRdo,
  BearerAuth, ApiParamOption, RequestWithRequestIdAndUser, PageQuery,
  UsersProfilesWithPaginationRdo, UserProfileQuery, UserProfileRdo,
  FriendsProfilesWithPaginationRdo, RequestWithRequestIdAndUserId
} from '@backend/shared/core';
import { joinUrl } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
import { UserProfileService } from './user-profile.service';

//! Добавить описание
@ApiTags(ApiServiceRoute.UsersProfiles)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.UsersProfiles)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService
  ) { }

  @ApiResponse({ type: UsersProfilesWithPaginationRdo })
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

  @ApiResponse({ type: FriendsProfilesWithPaginationRdo })
  @Get(UserProfileRoute.Friends)
  public async getFriends(
    @Query() query: PageQuery,
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<FriendsProfilesWithPaginationRdo> {
    const data = await this.userProfileService.getFriends(query, sub, role, requestId);

    return data;
  }

  @ApiResponse({ type: DetailUserProfileRdo })
  @Get(IdParam.USER)
  public async show(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<DetailUserProfileRdo> {
    const detailUser = await this.userProfileService.getDetailUserProfile(userId, sub, role, requestId);

    return detailUser;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @Post(UserProfileRoute.Friends)
  public async addFriend(
    @Body() { userId }: { userId: string }, //! нужен DTO
    @Req() request: RequestWithRequestIdAndUser
  ): Promise<void> {
    await this.userProfileService.addFriend(userId, request);
  }

  @Delete(joinUrl(UserProfileRoute.Friends, IdParam.USER))
  public async deleteFriend(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { userId: currentUserId, requestId }: RequestWithRequestIdAndUserId
  ): Promise<void> {
    await this.userProfileService.deleteFriend(userId, currentUserId, requestId);
  }
}
