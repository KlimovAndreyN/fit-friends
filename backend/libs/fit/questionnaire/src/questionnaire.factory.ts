import { Injectable } from '@nestjs/common';

import { CreateBasicQuestionnaireDto, EntityFactory, Questionnaire } from '@backend/shared/core';

import { QuestionnaireEntity } from './questionnaire.entity';

@Injectable()
export class QuestionnaireFactory implements EntityFactory<QuestionnaireEntity> {
  public create(entityPlainData: Questionnaire): QuestionnaireEntity {
    return new QuestionnaireEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateBasicQuestionnaireDto, userId: string): QuestionnaireEntity {
    const questionnaire: Questionnaire = {
      userId,
      specializations: dto.specializations, //! обязательно ли [...dto.specializations]
      trainingLevel: dto.trainingLevel,
      readyForTraining: false, //! по ТЗ не уточнения как по умолчанию
      duration: dto.duration,
      caloriesLose: dto.caloriesLose,
      caloriesWaste: dto.caloriesWaste,
      description: dto.description,
      fileIds: dto.fileIds, //! обязательно ли [...dto.fileIds] ? будул ли файлы обязательными?
      individualTraining: dto.individualTraining
    }

    return new QuestionnaireEntity(questionnaire);
  }
}
