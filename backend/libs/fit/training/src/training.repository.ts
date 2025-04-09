import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { Duration, Gender, Specialization, Training, TrainingLevel } from '@backend/shared/core';
import { Training as PrismaTraining } from '@prisma/client';

import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';

const MAX_COUNT = 50;

@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity, Training> {
  constructor(
    entityFactory: TrainingFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private convertPrismaTraining(record: PrismaTraining): TrainingEntity {
    const { trainingLevel, specialization, duration, gender } = record
    const training: Training = {
      ...record,
      trainingLevel: trainingLevel as TrainingLevel,
      specialization: specialization as Specialization,
      duration: duration as Duration,
      gender: gender as Gender
    };

    return this.createEntityFromDocument(training);
  }

  private convertPrismaTrainings(records: PrismaTraining[]): TrainingEntity[] {
    const trainings: TrainingEntity[] = records.map(
      (record) => (this.convertPrismaTraining(record))
    );

    return trainings;
  }

  public async find(ratingMin: number, ratingMax: number, isSpecial?: boolean, specializations?: Specialization[], take: number = MAX_COUNT): Promise<TrainingEntity[]> {
    //! позже вынести where отдельно и получение параметров через объект

    const records = await this.client.training.findMany({
      where: {
        specialization: { in: specializations }, //! когда будет отдельное условмие, то вынести отдельной строкой если есть, но работает и так с undefined
        isSpecial,
        rating: { gte: ratingMin, lte: ratingMax }
      },
      take
    });

    return this.convertPrismaTrainings(records);
  }

  public async findById(id: string): Promise<TrainingEntity> {
    const record = await this.client.training.findFirst({ where: { id } });

    if (!record) {
      //! вынести в константы
      throw new NotFoundException('Training Not Found');
    }

    return this.convertPrismaTraining(record);
  }

  public async save(entity: TrainingEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.training.create({
      data: { ...pojoEntity }
    });

    entity.id = record.id;
    entity.createdAt = record.createdAt;
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
