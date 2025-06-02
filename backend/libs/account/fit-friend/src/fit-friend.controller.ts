import { Body, Controller, Delete, Get, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, XAllApiHeaderOptions, RequestWithRequestIdAndUserId,
  RequestWithRequestIdAndUserIdAndUserRole, ApiParamOption, IdParam
} from '@backend/shared/core';
import { InjectUserIdInterceptor, InjectUserRoleInterceptor } from '@backend/shared/interceptors';

import { FitFriendService } from './fit-friend.service';

@ApiTags(ServiceRoute.Friends)
@ApiHeaders(XAllApiHeaderOptions)
@UseInterceptors(InjectUserIdInterceptor)
@Controller(ServiceRoute.Friends)
export class FitFriendController {
  constructor(
    private readonly fitFriendService: FitFriendService
  ) { }

  @Get()
  public async index(@Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole): Promise<void> {
    //! список друзей - нужна пагинация!
    const entity = await this.fitFriendService.findByUserId(userId);
    //! отладка
    console.log(userId, userRole, entity);
  }

  @Get(IdParam.USER)
  public async check(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { userId: currentUserId }: RequestWithRequestIdAndUserId
  ): Promise<boolean> {
    const isFriend = await this.fitFriendService.checkFriend(userId, currentUserId);

    return isFriend;
  }

  @UseInterceptors(InjectUserRoleInterceptor)
  @Post()
  public async addFriend(
    @Body() { userId }: { userId: string }, //! нужен DTO
    @Req() { userId: currentUserId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<void> {
    await this.fitFriendService.addFriend(userId, currentUserId, userRole);
  }

  @UseInterceptors(InjectUserRoleInterceptor)
  @Delete(IdParam.USER)
  public async deleteFriend(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { userId: currentUserId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<void> {
    await this.fitFriendService.deleteFriend(userId, currentUserId, userRole);
  }
}
