import { ForbiddenException, Injectable } from '@nestjs/common';

import { CreateBasicTrainingDto, isCoachRole, isForFreeTrainingSortType, Role, TrainingQuery } from '@backend/shared/core';

import { TrainingRepository } from './training.repository';
import { TrainingEntity, TrainingEntityWithPagination } from './training.entity';
import { TrainingFactory } from './training.factory';

const DEFAULT_POPULAR_RATING = { ratingMin: 4, ratingMax: 5, isPopular: true, isSortCreatedDate: true } as const;

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository
  ) { }

  public async find(query: TrainingQuery, userId: string, userRole: Role): Promise<TrainingEntityWithPagination> {
    if (isCoachRole(userRole)) {
      const { coachId } = query;

      if (coachId && (userId !== coachId)) { // разрешим тренеру смотреть тренировки в своей карточке
        throw new ForbiddenException('User with role \'coach\' is not allowed to use \'coachId\'!');
      }

      query.coachId = userId;
    }

    const { sortType } = query;
    const isSortCreatedDate = !sortType || isForFreeTrainingSortType(sortType)
    const result = await this.trainingRepository.find({ ...query, isSortCreatedDate });

    return result;
  }

  public async getSpecial(): Promise<TrainingEntity[]> {
    const { entities } = await this.trainingRepository.find({ isSpecial: true, isSortCreatedDate: true });

    return entities;
  }

  public async getPopular(): Promise<TrainingEntity[]> {
    //! по ТЗ не ясно, только с 5 или наивысший из имеющихся?
    //! а если рейтирнг тренировки будет до первого знака?
    //! пока сделал только от 4 до 5, и отсортированные убыванию рейтинга
    const { entities } = await this.trainingRepository.find(DEFAULT_POPULAR_RATING);

    return entities;
  }

  public async findById(id: string, userId: string, userRole: Role): Promise<TrainingEntity> {
    const foundTraining = await this.trainingRepository.findById(id);

    if (isCoachRole(userRole) && (userId !== foundTraining.userId)) {
      throw new ForbiddenException('Training not your!');
    }

    return foundTraining;
  }

  public async create(dto: CreateBasicTrainingDto, userId: string): Promise<TrainingEntity> {
    const entity: TrainingEntity = TrainingFactory.createFromDto(dto, userId);

    await this.trainingRepository.save(entity);

    return entity;
  }
}
