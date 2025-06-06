import { Body, Controller, Get, Param, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, RequestWithUserId, XAllApiHeaderOptions, TrainingRoute,
  TrainingRdo, BasicDetailTrainingRdo, IdParam, TrainingsWithPaginationRdo,
  TrainingQuery, ApiParamOption, RequestWithRequestIdAndUserIdAndUserRole,
  CreateBasicTrainingDto
} from '@backend/shared/core';
import { GuidValidationPipe } from '@backend/shared/pipes';
import { InjectUserRoleInterceptor } from '@backend/shared/interceptors';
import { fillDto } from '@backend/shared/helpers';

import { TrainingService } from './training.service';
import { TrainingEntity } from './training.entity';

//! добавить описание для всех маршрутов
@ApiTags(ServiceRoute.Trainings)
@ApiHeaders(XAllApiHeaderOptions)
@UseInterceptors(InjectUserRoleInterceptor)
@Controller(ServiceRoute.Trainings)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  private convertTrainingEntities(entities: TrainingEntity[]): TrainingRdo[] {
    return entities.map((item) => (fillDto(TrainingRdo, item.toPOJO())));
  }

  @ApiResponse({ type: TrainingsWithPaginationRdo })
  @Get()
  public async index(
    @Query() query: TrainingQuery,
    @Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<TrainingsWithPaginationRdo> {
    const trainingsWithPagination = await this.trainingService.find(query, userId, userRole);
    const { entities, ...others } = trainingsWithPagination;
    const result = {
      ...others,
      entities: this.convertTrainingEntities(entities)
    };

    return result;
  }

  //GET /TrainingRoute.ForSportsman выполянется прям на api

  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get(TrainingRoute.Special)
  public async getSpecial(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getSpecial();

    return this.convertTrainingEntities(data);
  }

  //! тут проверить, что не тренер
  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get(TrainingRoute.Popular)
  public async getPopular(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getPopular();

    return this.convertTrainingEntities(data);
  }

  @ApiResponse({ type: TrainingRdo })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async show(
    @Param(ApiParamOption.TrainingId.name, GuidValidationPipe) trainingId: string,
    @Req() { userId, userRole }: RequestWithRequestIdAndUserIdAndUserRole
  ): Promise<BasicDetailTrainingRdo> {
    //! возможно тут нужно проверить куплена ли тренировка.... если не куплена, то очистить videoFileId... как по ТЗ?

    const entity = await this.trainingService.findById(trainingId, userId, userRole);

    return fillDto(BasicDetailTrainingRdo, entity.toPOJO());
  }

  //! тут проверить, что не спортсмен
  @ApiResponse({ type: TrainingRdo })
  @Post()
  public async create(
    @Body() dto: CreateBasicTrainingDto,
    @Req() { userId }: RequestWithUserId
  ): Promise<BasicDetailTrainingRdo> {
    const entity = await this.trainingService.create(dto, userId);

    return fillDto(BasicDetailTrainingRdo, entity.toPOJO());
  }
}
