import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionNameOption } from '@backend/shared/core';

import { FitQuestionnaireService } from './fit-questionnaire.service';
import { FitQuestionnaireController } from './fit-questionnaire.controller';
import { FitQuestionnaireRepository } from './fit-questionnaire.repository';
import { FitQuestionnaireFactory } from './fit-questionnaire.factory';
import { FitQuestionnaireModels } from './fit-questionnaire.model';

@Module({
  imports: [
    MongooseModule.forFeature(
      FitQuestionnaireModels,
      ConnectionNameOption.Account
    )
  ],
  providers: [
    FitQuestionnaireService,
    FitQuestionnaireRepository,
    FitQuestionnaireFactory
  ],
  controllers: [FitQuestionnaireController],
  exports: [FitQuestionnaireRepository]
})
export class FitQuestionnaireModule { }
