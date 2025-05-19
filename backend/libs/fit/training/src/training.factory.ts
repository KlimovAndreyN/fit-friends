import { Injectable } from '@nestjs/common';

import { CreateBasicTrainingDto, EntityFactory, Training } from '@backend/shared/core';

import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  public create(entityPlainData: Training): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateBasicTrainingDto, userId: string): TrainingEntity {
    const training: Training = {
      title: dto.title,
      backgroundPath: dto.backgroundPath,
      trainingLevel: dto.trainingLevel,
      specialization: dto.specialization,
      duration: dto.duration,
      price: dto.price,
      oldPrice: dto.price, // старая связана с isSpecial, при создании равна price
      caloriesWaste: dto.caloriesWaste,
      description: dto.description,
      gender: dto.gender,
      videoFileId: dto.videoFileId,
      userId,
      isSpecial: false // на форме при создании нет, значит false
    }

    return new TrainingEntity(training);
  }
}
