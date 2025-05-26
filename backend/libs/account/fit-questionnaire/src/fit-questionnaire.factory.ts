import { Injectable } from '@nestjs/common';

import { CreateBasicQuestionnaireDto, EntityFactory, Questionnaire } from '@backend/shared/core';

import { FitQuestionnaireEntity } from './fit-questionnaire.entity';

@Injectable()
export class FitQuestionnaireFactory implements EntityFactory<FitQuestionnaireEntity> {
  public create(entityPlainData: Questionnaire): FitQuestionnaireEntity {
    return new FitQuestionnaireEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateBasicQuestionnaireDto, userId: string): FitQuestionnaireEntity {
    const questionnaire: Questionnaire = {
      userId,
      specializations: dto.specializations,
      trainingLevel: dto.trainingLevel,
      readyForTraining: false, //! по ТЗ нет уточнения как по умолчанию
      duration: dto.duration,
      caloriesLose: dto.caloriesLose,
      caloriesWaste: dto.caloriesWaste,
      description: dto.description,
      fileIds: dto.fileIds,
      individualTraining: dto.individualTraining
    }

    return new FitQuestionnaireEntity(questionnaire);
  }
}
