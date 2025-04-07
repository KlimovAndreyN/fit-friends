import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Training } from '@backend/shared/core';

import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository
  ) { }

  private checkAuthorization(userId: string): void {
    if (!userId) {
      //! вынести в константы
      throw new UnauthorizedException('Unauthorized.');
    }
  }

  public async findById(id: string, userId: string): Promise<TrainingEntity> {
    this.checkAuthorization(userId);

    const foundTraining = await this.trainingRepository.findById(id);

    return foundTraining;
  }

  //! временно Training потом будет CreateQuestionnaireWithFileIdsDto
  public async create(dto: Training, userId: string): Promise<TrainingEntity> {
    const entity: TrainingEntity = TrainingFactory.createFromDto(dto, userId);

    await this.trainingRepository.save(entity);

    return entity;
  }
}
