import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FitQuestionnaireRepository } from './fit-questionnaire.repository';
import { FitQuestionnaireFactory } from './fit-questionnaire.factory';
import { FitQuestionnaireModel, FitQuestionnaireSchema } from './fit-questionnaire.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: FitQuestionnaireModel.name,
          schema: FitQuestionnaireSchema
        }
      ]
    )
  ],
  providers: [
    FitQuestionnaireRepository,
    FitQuestionnaireFactory
  ],
  exports: [FitQuestionnaireRepository]
})
export class FitQuestionnaireModule { }
