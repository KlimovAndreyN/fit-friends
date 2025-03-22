import { Module } from '@nestjs/common';

import { FitConfigModule } from '@backend/fit/config';
import { PrismaClientModule } from '@backend/fit/models';
import { QuestionnaireModule } from '@backend/fit/questionnaire'

@Module({
  imports: [
    FitConfigModule,
    PrismaClientModule,
    QuestionnaireModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
