import { Injectable } from '@nestjs/common';

import { EntityFactory, Training } from '@backend/shared/core';

import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingFactory implements EntityFactory<TrainingEntity> {
  public create(entityPlainData: Training): TrainingEntity {
    return new TrainingEntity(entityPlainData);
  }

  //! временно? потом будет CreateTrainingWithFileIdDto и преобразование
  public static createFromDto(dto: Training, userId: string): TrainingEntity {
    const training: Training = {
      title: dto.title,
      backgroundPath: dto.backgroundPath,
      trainingLevel: dto.trainingLevel,
      specialization: dto.specialization,
      duration: dto.duration,
      price: dto.price,
      caloriesWaste: dto.caloriesWaste,
      description: dto.description,
      gender: dto.gender,
      videoFileId: dto.videoFileId,
      rating: 0,
      userId,
      isSpecial: dto.isSpecial
    }

    return new TrainingEntity(training);
  }
}
