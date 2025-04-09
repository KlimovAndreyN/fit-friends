import { Module } from '@nestjs/common';

import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireFactory } from './questionnaire.factory';
import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  controllers: [QuestionnaireController],
  providers: [
    QuestionnaireService,
    QuestionnaireRepository,
    QuestionnaireFactory
  ],
  exports: [QuestionnaireRepository]
})
export class QuestionnaireModule { }
