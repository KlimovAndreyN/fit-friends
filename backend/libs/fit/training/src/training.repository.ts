import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import {
  Duration, ITrainingRepositoryQuery, SortDirection, Gender, TrainingSortType,
  Specialization, Training, TrainingLevel, isForFreeTrainingSortType
} from '@backend/shared/core';
import { Prisma, Training as PrismaTraining } from '@prisma/client';

import { TrainingEntity, TrainingEntityWithPagination } from './training.entity';
import { TrainingFactory } from './training.factory';

const Default = {
  PAGE: 1,
  LIMIT_MAX: 50,
  SORT_TYPE: TrainingSortType.LowPrice
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

  private calculateTrainingsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  private getTrainingsCount(where: Prisma.TrainingWhereInput): Promise<number> {
    return this.client.training.count({ where });
  }

  private async getTrainingsMaxPrice(where: Prisma.TrainingWhereInput): Promise<number | undefined> {
    const result = await this.client.training.aggregate({ where, _max: { price: true } });
    const { price } = result._max;

    return price ?? undefined;
  }

  public async findTrainings(
    where: Prisma.TrainingWhereInput,
    orderBy: Prisma.TrainingOrderByWithRelationInput[],
    skip: number,
    take: number
  ): Promise<TrainingEntity[]> {
    const records = await this.client.training.findMany({
      where,
      orderBy,
      skip,
      take
    });

    return this.convertPrismaTrainings(records);
  }

  public async find(query: ITrainingRepositoryQuery): Promise<TrainingEntityWithPagination> {
    const {
      page: currentPage = Default.PAGE,
      limit: take = Default.LIMIT_MAX,
      priceMin,
      priceMax,
      caloriesWasteMin,
      caloriesWasteMax,
      ratingMin,
      ratingMax,
      gender,
      specializations,
      durations,
      sortType = Default.SORT_TYPE,
      coachId,
      isSortCreatedDate,
      isSpecial,
      isPopular
    } = query;
    const skip = (currentPage - 1) * take;
    const where: Prisma.TrainingWhereInput = {};
    const orderBy: Prisma.TrainingOrderByWithRelationInput[] = [];

    if (isForFreeTrainingSortType(sortType)) {
      where.price = 0;
    } else {
      where.price = { gte: priceMin, lte: priceMax };
    }

    where.caloriesWaste = { gte: caloriesWasteMin, lte: caloriesWasteMax };
    where.rating = { gte: ratingMin, lte: ratingMax };
    where.isSpecial = isSpecial;

    if (gender && (gender !== Gender.NotMatter)) {
      where.gender = { in: [gender, Gender.NotMatter] };
    }

    where.specialization = { in: specializations };
    where.duration = { in: durations };
    where.userId = coachId;

    if (isPopular) {
      orderBy.push({ rating: SortDirection.Desc });
    }

    if (isSortCreatedDate) {
      orderBy.push({ createdAt: SortDirection.Desc });
    }

    switch (sortType) {
      case TrainingSortType.LowPrice:
        orderBy.push({ price: SortDirection.Asc });
        break;
      case TrainingSortType.HighPrice:
        orderBy.push({ price: SortDirection.Desc });
        break;
    }

    const [entities, trainingsCount, trainingsMaxPrice] = await Promise.all(
      [
        this.findTrainings(where, orderBy, skip, take),
        this.getTrainingsCount(where),
        this.getTrainingsMaxPrice({ ...where, price: undefined })
      ]
    );

    return {
      entities,
      currentPage,
      totalPages: this.calculateTrainingsPage(trainingsCount, take),
      itemsPerPage: take,
      totalItems: trainingsCount,
      trainingsMaxPrice: trainingsMaxPrice
    }
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
    entity.rating = record.rating;
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
