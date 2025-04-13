import { Injectable } from '@nestjs/common';

import { Training } from '@backend/shared/core';
import { QuestionnaireRepository } from '@backend/fit/questionnaire';

import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { TrainingFactory } from './training.factory';

const FOR_SPOTRSMAN_COUNT = 9;

@Injectable()
export class TrainingService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository,
    private readonly trainingRepository: TrainingRepository
  ) { }

  public async getForSportsman(userId: string): Promise<TrainingEntity[]> {
    //! придумать алгоритм подходящих, забрать данные из опросника и выполнить по ним поиск, расставив баллы по совпадениям
    //! пока только специализации
    const { specializations } = await this.questionnaireRepository.findByUserId(userId);
    const foundTrainings = await this.trainingRepository.find(0, 5, undefined, specializations, FOR_SPOTRSMAN_COUNT);

    return foundTrainings;
  }

  public async getSpecial(): Promise<TrainingEntity[]> {
    const foundTrainings = await this.trainingRepository.find(0, 5, true); //! 0 и 5 временно

    return foundTrainings;
  }

  public async getPopular(): Promise<TrainingEntity[]> {
    //! по ТЗ не ясно, только с 5 или наивысший из имеющихся?
    //! а если рейтирнг тренировки будет до первого знака?
    //! пока сделал только от 5 до 4, и отсортированные убыванию рейтинга... а пока в моках нет пересчета рейтинга от 3
    //! но нужно убрать в константы
    const foundTrainings = await this.trainingRepository.find(3, 5);

    return foundTrainings;
  }

  public async findById(id: string): Promise<TrainingEntity> {
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
