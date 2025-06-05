import { Body, Controller, Get, Param, Patch, Post, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, XAllApiHeaderOptions, ApiParamOption, IdParam, TrainingRequestRdo, TrainingRequestRoute, RequestWithUserId, RequestWithRequestIdAndUserIdAndUserRole, TrainingRequestStatus } from '@backend/shared/core';
import { fillDto, joinUrl } from '@backend/shared/helpers';
import { InjectUserRoleInterceptor } from '@backend/shared/interceptors';

import { TrainingRequestService } from './training-request.service';

@ApiTags(ServiceRoute.TrainingsRequests)
@ApiHeaders(XAllApiHeaderOptions)
@Controller(ServiceRoute.TrainingsRequests)
export class TrainingRequestController {
  constructor(
    private readonly trainingRequestService: TrainingRequestService
  ) { }

  @ApiResponse({ type: TrainingRequestRdo })
  @ApiParam(ApiParamOption.UserId)
  @Get(joinUrl(TrainingRequestRoute.FindToUser, IdParam.USER))
  public async findToUser(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { userId: currentUserId }: RequestWithUserId
  ): Promise<TrainingRequestRdo> {
    const entity = await this.trainingRequestService.findToUserId(currentUserId, userId);

    return fillDto(TrainingRequestRdo, entity.toPOJO());
  }

  @ApiResponse({ type: TrainingRequestRdo })
  @ApiParam(ApiParamOption.UserId)
  @Get(joinUrl(TrainingRequestRoute.FindFromUser, IdParam.USER))
  public async findFromUser(
    @Param(ApiParamOption.UserId.name) userId: string,
    @Req() { userId: currentUserId }: RequestWithUserId
  ): Promise<TrainingRequestRdo> {
    const entity = await this.trainingRequestService.findToUserId(userId, currentUserId);

    return fillDto(TrainingRequestRdo, entity.toPOJO());
  }

  @ApiResponse({ type: TrainingRequestRdo })
  @UseInterceptors(InjectUserRoleInterceptor)
  @Post()
  public async create(
    @Body() dto: { userId: string; }, //! нужен свой DTO
    @Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<TrainingRequestRdo> {
    const entity = await this.trainingRequestService.create(dto, userId, userRole); //! проверить роль, тренерам нельзя

    return fillDto(TrainingRequestRdo, entity.toPOJO());
  }

  @ApiResponse({ type: TrainingRequestRdo })
  @ApiParam(ApiParamOption.TrainingRequestId)
  @Patch(IdParam.TRAINING_REQUEST)
  public async update(
    @Body() dto: { status: TrainingRequestStatus; }, //! нужен свой DTO
    @Param(ApiParamOption.TrainingRequestId.name) trainingRequestId: string,
    @Req() { userId }: RequestWithUserId
  ): Promise<TrainingRequestRdo> {
    const entity = await this.trainingRequestService.updateById(dto, trainingRequestId, userId); //! проверить что в запросе userId = userId

    return fillDto(TrainingRequestRdo, entity.toPOJO());
  }
}
