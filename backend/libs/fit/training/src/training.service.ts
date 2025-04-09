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

  public async getForSportsman(userId: string): Promise<TrainingEntity[]> {
    const foundTrainings = await this.trainingRepository.find(userId);

    return foundTrainings;
  }

  public async findById(id: string, userId: string): Promise<TrainingEntity> {
    const foundTraining = await this.trainingRepository.findById(id);

    return foundTraining;
  }

  //! временно, потом будет CreateTrainingWithFileIdDto
  public async create(dto: Training, userId: string): Promise<TrainingEntity> {
    const entity: TrainingEntity = TrainingFactory.createFromDto(dto, userId);

    await this.trainingRepository.save(entity);

    return entity;
  }
}
