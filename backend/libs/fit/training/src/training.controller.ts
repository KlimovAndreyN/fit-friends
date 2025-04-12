import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiHeaders, ApiParam, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, RequestWithUserId, XApiHeaderOptions, TrainingRoute,
  TrainingRdo, BasicDetailTrainingRdo, ApiParamOption, IdParam
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';

import { TrainingService } from './training.service';
import { TrainingEntity } from './training.entity';

//! добавить описание для всех маршрутов
@ApiTags(ServiceRoute.Trainings)
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Trainings)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }
  private convertTrainingEntities(entities: TrainingEntity[]): TrainingRdo[] {
    return entities.map((item) => (fillDto(TrainingRdo, item.toPOJO())));
  }

  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() { userId }: RequestWithUserId): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getForSportsman(userId);

    return this.convertTrainingEntities(data);
  }

  @Get(TrainingRoute.Special)
  public async getSpecial(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getSpecial();

    return this.convertTrainingEntities(data);
  }

  @Get(TrainingRoute.Popular)
  public async getPopular(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getPopular();

    return this.convertTrainingEntities(data);
  }

  @Get()
  public async index(): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getPopular();//! временно

    return this.convertTrainingEntities(data);
  }

  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async show(@Param(ApiParamOption.TrainingId.name) trainingId: string): Promise<BasicDetailTrainingRdo> {
    const entity = await this.trainingService.findById(trainingId);

    return fillDto(BasicDetailTrainingRdo, entity.toPOJO());
  }
}
