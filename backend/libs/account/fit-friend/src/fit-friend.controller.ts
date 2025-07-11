import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, XUserApiHeaderOptions, RequestWithRequestIdAndUserId,
  RequestWithRequestIdAndUserIdAndUserRole, ApiParamOption, IdParam,
  XApiHeaderOptions, RequestWithUserId, PageQuery, PaginationResult
} from '@backend/shared/core';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { InjectUserIdInterceptor, InjectUserRoleInterceptor } from '@backend/shared/interceptors';

import { FitFriendService } from './fit-friend.service';

@ApiTags(ServiceRoute.Friends)
@ApiHeaders(XApiHeaderOptions)
@UseInterceptors(InjectUserIdInterceptor)
@Controller(ServiceRoute.Friends)
export class FitFriendController {
  constructor(
    private readonly fitFriendService: FitFriendService
  ) { }

  @Get()
  public async index(
    @Query() query: PageQuery,
    @Req() { userId }: RequestWithUserId
  ): Promise<PaginationResult<string>> {
    const data = await this.fitFriendService.findByUserId(userId, query);

    return data;
  }

  @Get(IdParam.USER)
  public async check(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Req() { userId: currentUserId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    const isFriend = await this.fitFriendService.checkFriend(userId, currentUserId);

    return isFriend;
  }

  @ApiHeaders(XUserApiHeaderOptions)
  @UseInterceptors(InjectUserRoleInterceptor)
  @Post()
  public async addFriend(
    @Body() { userId }: { userId: string }, //! нужен DTO
    @Req() { userId: currentUserId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<void> {
    await this.fitFriendService.addFriend(userId, currentUserId, userRole);
  }

  @Delete(IdParam.USER)
  public async deleteFriend(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Req() { userId: currentUserId }: RequestWithUserId
  ): Promise<void> {
    await this.fitFriendService.deleteFriend(userId, currentUserId);
  }
}
