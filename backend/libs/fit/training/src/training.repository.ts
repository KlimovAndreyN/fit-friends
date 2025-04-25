import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { Duration, Gender, ITrainingRepository, SortDirection, SortType, Specialization, Training, TrainingLevel } from '@backend/shared/core';
import { Prisma, Training as PrismaTraining } from '@prisma/client';

import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';

const Default = {
  PAGE: 1,
  SORT_TYPE: SortType.LowPrice
} as const;

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

  public async find(query: ITrainingRepository, take: number): Promise<TrainingEntity[]> {
    const {
      page: currentPage = Default.PAGE,
      priceMin,
      priceMax,
      caloriesWasteMin,
      caloriesWasteMax,
      ratingMin,
      ratingMax,
      specializations,
      durations,
      sortType = Default.SORT_TYPE,
      isSortCreatedDate,
      isSpecial,
      isPopular
    } = query;
    const skip = (currentPage - 1) * take;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput[] = [];

    if (sortType === SortType.ForFree) {
      where.price = 0;
    } else {
      where.price = { gte: priceMin, lte: priceMax };
    }

    where.caloriesWaste = { gte: caloriesWasteMin, lte: caloriesWasteMax };
    where.rating = { gte: ratingMin, lte: ratingMax };
    where.isSpecial = isSpecial;
    where.specialization = { in: specializations };
    where.duration = { in: durations };

    if (isPopular) {
      orderBy.push({ rating: SortDirection.Desc });
    }

    if (isSortCreatedDate) {
      orderBy.push({ createdAt: SortDirection.Desc });
    }

    switch (sortType) {
      case SortType.LowPrice:
        orderBy.push({ price: SortDirection.Asc });
        break;
      case SortType.HighPrice:
        orderBy.push({ price: SortDirection.Desc });
        break;
    }

    const records = await this.client.training.findMany({
      where,
      orderBy,
      skip,
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
