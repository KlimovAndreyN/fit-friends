import { Injectable } from '@nestjs/common';

import { CreateQuestionnaireDto, EntityFactory, Questionnaire } from '@backend/shared/core';

import { QuestionnaireEntity } from './questionnaire.entity';

@Injectable()
export class QuestionnaireFactory implements EntityFactory<QuestionnaireEntity> {
  public create(entityPlainData: Questionnaire): QuestionnaireEntity {
    return new QuestionnaireEntity(entityPlainData);
  }

  public static createFromDto(dto: CreateQuestionnaireDto, userId: string): QuestionnaireEntity {
    const questionnaire: Questionnaire = {
      userId,
      specializations: dto.specializations,
      level: dto.level,
      time: dto.time,
      caloriesLose: dto.caloriesLose,
      caloriesWaste: dto.caloriesWaste
    };

    return new QuestionnaireEntity(questionnaire);
  }
}
