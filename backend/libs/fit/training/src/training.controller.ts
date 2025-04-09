import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, RequestWithUserId, XApiHeaderOptions, Training, TrainingRoute } from '@backend/shared/core';

import { TrainingService } from './training.service';
import { TrainingEntity } from './training.entity';

@ApiTags('training')
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Training)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  //! добавить описание
  //@ApiResponse({ type: TrainingWithFileIdRdo }) //! вынести в описание
  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() { userId }: RequestWithUserId): Promise<TrainingEntity[]> {
    const entity = await this.trainingService.getForSportsman(userId);

    //! временно
    return entity;
    //return fillDto(Training, entity);
  }

  //! добавить описание
  //@ApiResponse({ type: TrainingWithFileIdRdo }) //! вынести в описание
  @Get()
  public async index(): Promise<Training> {
    const entity = await this.trainingService.findById('1');

    //! временно
    return entity;
    //return fillDto(Training, entity);
  }

  //! добавить описание
  //@ApiResponse({ type: TrainingWithFileIdRdo }) //! вынести в описание
  @Get(':trainingId')
  public async show(@Param() id: string): Promise<Training> {
    const entity = await this.trainingService.findById(id);

    //! временно
    return entity;
    //return fillDto(Training, entity);
  }
}
