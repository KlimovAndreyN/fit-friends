import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, RequestWithUserId, XApiHeaderOptions, Training } from '@backend/shared/core';

import { TrainingService } from './training.service';

@ApiTags('training')
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Training)
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  //! добавить описание
  //@ApiResponse({ type: TrainingWithFileIdRdo }) //! вынести в описание
  @Get()
  public async show(@Req() { userId }: RequestWithUserId, @Param() id: string): Promise<Training> {
    const entity = await this.trainingService.findById(id, userId);

    //! временно
    return entity;
    //return fillDto(Training, entity);
  }
}
