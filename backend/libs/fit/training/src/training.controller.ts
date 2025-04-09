import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, RequestWithUserId, XApiHeaderOptions, Training, TrainingRoute, TrainingRdo } from '@backend/shared/core';

import { TrainingService } from './training.service';
import { TrainingEntity } from './training.entity';
import { fillDto } from '@backend/shared/helpers';

//! добавить описание для всех маршрутов
@ApiTags('training')
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Training)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() { userId }: RequestWithUserId): Promise<TrainingRdo[]> {
    const data = await this.trainingService.getForSportsman(userId);

    return data.map((item) => (fillDto(TrainingRdo, item.toPOJO())));
  }

  @Get(TrainingRoute.Special)
  public async getSpecial(): Promise<TrainingEntity[]> {
    const data = await this.trainingService.getSpecial();

    //! временно
    return data;
    //return fillDto(TrainingRdo, data.toPOJO());
  }

  @Get(TrainingRoute.Popular)
  public async getPopular(): Promise<TrainingEntity[]> {
    const data = await this.trainingService.getPopular();

    //! временно
    return data;
    //return fillDto(TrainingRdo, data.toPOJO());
  }

  @Get()
  public async index(): Promise<Training> {
    const entity = await this.trainingService.findById('1');

    //! временно
    return entity;
    //return fillDto(TrainingRdo, entity.toPOJO());
  }

  @Get(':trainingId') //! в констнты
  public async show(@Param() id: string): Promise<Training> {
    const entity = await this.trainingService.findById(id);

    //! временно
    return entity;
    //return fillDto(DetailTrainingRdo, entity.toPOJO());
  }
}
