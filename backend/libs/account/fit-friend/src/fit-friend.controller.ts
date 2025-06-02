import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
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
    private readonly fitFriendService: FitFriendService
  ) { }

  @Get()
  public async index(@Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole): Promise<void> {
    //! список друзей
    const entity = await this.fitFriendService.findByUserId(userId);
    console.log(userId, userRole, entity);
  }

  @Post()
  public async addFriend(
    @Body() { userId }: { userId: string }, //! нужен DTO
    @Req() { userId: currentUserId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<void> {
    //! может вернуть список друзей?
    await this.fitFriendService.addFriend(userId, currentUserId, userRole);
  }
}
