import { Module } from '@nestjs/common';

import { TrainingController } from './training.controller';
import { TrainingFactory } from './training.factory';
import { TrainingRepository } from './training.repository';
import { TrainingService } from './training.service';
import { QuestionnaireModule } from '@backend/fit/questionnaire';

@Module({
  imports: [QuestionnaireModule],
  controllers: [TrainingController],
  providers: [
    TrainingService,
    TrainingRepository,
    TrainingFactory
  ]
})
export class TrainingModule { }
