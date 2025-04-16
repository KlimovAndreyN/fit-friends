import { Injectable } from '@nestjs/common';

import { Training, TrainingQuery } from '@backend/shared/core';
import { QuestionnaireRepository } from '@backend/fit/questionnaire';

import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';

const DefaultCount = {
  //! отладка MAX: 50,
  MAX: 20, //!
  FOR_SPOTRSMAN: 9
} as const;

const POPULAR_RATING = { ratingMin: 4, ratingMax: 5, isPopular: true } as const;

@Injectable()
export class TrainingService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
    private readonly trainingRepository: TrainingRepository
  ) { }

  public async find(query: TrainingQuery): Promise<TrainingEntity[]> {
    const foundTrainings = await this.trainingRepository.find(query, DefaultCount.MAX);

    return foundTrainings;
  }

  public async getForSportsman(userId: string): Promise<TrainingEntity[]> {
    //! придумать алгоритм подходящих, забрать данные из опросника и выполнить по ним поиск, расставив баллы по совпадениям
    //! пока только специализации
    const { specializations } = await this.questionnaireRepository.findByUserId(userId);
    const foundTrainings = await this.trainingRepository.find({ specializations }, DefaultCount.FOR_SPOTRSMAN);

    return foundTrainings;
  }

  public async getSpecial(): Promise<TrainingEntity[]> {
    const foundTrainings = await this.trainingRepository.find({ isSpecial: true }, DefaultCount.MAX); //! 0 и 5 временно

    return foundTrainings;
  }

  public async getPopular(): Promise<TrainingEntity[]> {
    //! по ТЗ не ясно, только с 5 или наивысший из имеющихся?
    //! а если рейтирнг тренировки будет до первого знака?
    //! пока сделал только от 5 до 4, и отсортированные убыванию рейтинга
    const foundTrainings = await this.trainingRepository.find(POPULAR_RATING, DefaultCount.MAX);

    return foundTrainings;
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
