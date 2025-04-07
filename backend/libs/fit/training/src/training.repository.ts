import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { Duration, Gender, Specialization, Training, TrainingLevel } from '@backend/shared/core';

import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity, Training> {
  constructor(
    entityFactory: TrainingFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private convertFields({ trainingLevel, specialization, duration, gender }): {
    trainingLevel: TrainingLevel;
    specialization: Specialization;
    duration: Duration;
    gender: Gender;
  } {
    return {
      trainingLevel: trainingLevel as TrainingLevel,
      specialization: specialization as Specialization,
      duration: duration as Duration,
      gender: gender as Gender
    };
  }

  public async findById(id: string): Promise<TrainingEntity> {
    const record = await this.client.training.findFirst({ where: { id } });

    if (!record) {
      //! вынести в константы
      throw new NotFoundException(' Training Not Found');
    }

    const training: Training = {
      ...record,
      ...this.convertFields(record)
    };

    return this.createEntityFromDocument(training);
  }

  public async save(entity: TrainingEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    await this.client.training.create({
      data: { ...pojoEntity }
    });
  }

  public async update(entity: TrainingEntity): Promise<void> {
    const { id } = entity;
    const pojoEntity = entity.toPOJO();

    await this.client.training.update({
      where: { id },
      data: { ...pojoEntity }
    });
  }
}
