import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FitQuestionnaireRepository } from './fit-questionnaire.repository';
import { FitQuestionnaireFactory } from './fit-questionnaire.factory';
import { FitQuestionnaireModel, FitQuestionnaireSchema } from './fit-questionnaire.model';
import { FitQuestionnaireController } from './fit-questionnaire.controller';
import { FitQuestionnaireService } from './fit-questionnaire.service';

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
  controllers: [FitQuestionnaireController],
  providers: [
    FitQuestionnaireService,
    FitQuestionnaireRepository,
    FitQuestionnaireFactory
  ]
})
export class FitQuestionnaireModule { }
