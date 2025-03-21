import { Injectable } from '@nestjs/common';

import { EntityFactory, Questionnaire } from '@backend/shared/core';

import { FitQuestionnaireEntity } from './fit-questionnaire.entity';

@Injectable()
export class FitQuestionnaireFactory implements EntityFactory<FitQuestionnaireEntity> {
  public create(entityPlainData: Questionnaire): FitQuestionnaireEntity {
    return new FitQuestionnaireEntity(entityPlainData);
  }
}
