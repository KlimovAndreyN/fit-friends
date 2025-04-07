import { Module } from '@nestjs/common';

import { FitConfigModule } from '@backend/fit/config';
import { PrismaClientModule } from '@backend/fit/models';
import { QuestionnaireModule } from '@backend/fit/questionnaire';
import { TrainingModule } from '@backend/fit/training';

@Module({
  imports: [
    FitConfigModule,
    PrismaClientModule,
    QuestionnaireModule,
    TrainingModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
