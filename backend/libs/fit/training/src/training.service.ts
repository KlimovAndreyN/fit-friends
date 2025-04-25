import { Injectable } from '@nestjs/common';

import { SortType, Training, TrainingQuery } from '@backend/shared/core';
import { QuestionnaireRepository } from '@backend/fit/questionnaire';

import { TrainingRepository } from './training.repository';
import { TrainingEntity, TrainingEntityWithPagination } from './training.entity';
import { TrainingFactory } from './training.factory';

const Default = {
  //! отладка MAX: 50,
  MAX_COUNT: 20, //!
  FOR_SPOTRSMAN_COUNT: 9,
  POPULAR_RATING: { ratingMin: 4, ratingMax: 5, isPopular: true, isSortCreatedDate: true }
} as const;

@Injectable()
export class TrainingService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
    private readonly trainingRepository: TrainingRepository
  ) { }

  public async find(query: TrainingQuery): Promise<TrainingEntityWithPagination> {
    const { sortType } = query;
    const isSortCreatedDate = (!sortType) || (sortType === SortType.ForFree)
    const result = await this.trainingRepository.find({ ...query, isSortCreatedDate }, Default.MAX_COUNT);

    return result;
  }

  public async getForSportsman(userId: string): Promise<TrainingEntity[]> {
    //! придумать алгоритм подходящих, забрать данные из опросника и выполнить по ним поиск, расставив баллы по совпадениям
    //! пока только специализации

    const { specializations } = await this.questionnaireRepository.findByUserId(userId);
    const { entities } = await this.trainingRepository.find({ specializations, isSortCreatedDate: true }, Default.FOR_SPOTRSMAN_COUNT);

    return entities;
  }

  public async getSpecial(): Promise<TrainingEntity[]> {
    const { entities } = await this.trainingRepository.find({ isSpecial: true, isSortCreatedDate: true }, Default.MAX_COUNT); //! 0 и 5 временно

    return entities;
  }

  public async getPopular(): Promise<TrainingEntity[]> {
    //! по ТЗ не ясно, только с 5 или наивысший из имеющихся?
    //! а если рейтирнг тренировки будет до первого знака?
    //! пока сделал только от 5 до 4, и отсортированные убыванию рейтинга
    const { entities } = await this.trainingRepository.find(Default.POPULAR_RATING, Default.MAX_COUNT);

    return entities;
  }

  public async findById(id: string): Promise<TrainingEntity> {
    const foundTraining = await this.trainingRepository.findById(id);

    return foundTraining;
  }

  //! временно, потом будет CreateTrainingWithFileIdDto
  public async create(dto: Training, userId: string): Promise<TrainingEntity> {
    //! обработать - Unique constraint failed on the fields: (`user_id`)
    // или тут поиском по userId или в репозитарии при вставке данных

    const entity: TrainingEntity = TrainingFactory.createFromDto(dto, userId);

    await this.trainingRepository.save(entity);

    return entity;
  }
}
