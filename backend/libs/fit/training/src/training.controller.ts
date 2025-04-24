import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiHeaders, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, RequestWithUserId, XAllApiHeaderOptions, TrainingRoute,
  TrainingRdo, BasicDetailTrainingRdo, ApiParamOption, IdParam, TrainingQuery
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';

import { TrainingService } from './training.service';
import { TrainingEntity } from './training.entity';

//! добавить описание для всех маршрутов
@ApiTags(ServiceRoute.Trainings)
@ApiHeaders(XAllApiHeaderOptions)
@Controller(ServiceRoute.Trainings)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  private convertTrainingEntities(entities: TrainingEntity[]): TrainingRdo[] {
    return entities.map((item) => (fillDto(TrainingRdo, item.toPOJO())));
  }

  //! обработать роль и id пользователя
  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get()
  public async index(@Query() query: TrainingQuery): Promise<TrainingRdo[]> {
    const data = await this.trainingService.find(query);

    return this.convertTrainingEntities(data); //! тут нужна пагинация!
  }

  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() { userId }: RequestWithUserId): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getForSportsman(userId);

    return this.convertTrainingEntities(data);
  }

  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get(TrainingRoute.Special)
  public async getSpecial(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getSpecial();

    return this.convertTrainingEntities(data);
  }

  @ApiResponse({ type: TrainingRdo, isArray: true })
  @Get(TrainingRoute.Popular)
  public async getPopular(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getPopular();

    return this.convertTrainingEntities(data);
  }

  //! обработать роль и id пользователя
  @ApiResponse({ type: TrainingRdo })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async show(@Param(ApiParamOption.TrainingId.name) trainingId: string): Promise<BasicDetailTrainingRdo> {
    const entity = await this.trainingService.findById(trainingId);
    //! возможно тут проверить куплена ли тренировка.... если не куплена, то очистить videoFileId... как по ТЗ?

    return fillDto(BasicDetailTrainingRdo, entity.toPOJO());
  }
}
