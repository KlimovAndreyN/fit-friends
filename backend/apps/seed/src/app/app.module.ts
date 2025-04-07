import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getEnvMongooseOptions } from '@backend/shared/helpers';
import { FitUserModule } from '@backend/account/fit-user';
import { PrismaClientModule } from '@backend/fit/models';
import { QuestionnaireModule } from '@backend/fit/questionnaire';
import { TrainingModule } from '@backend/fit/training';

@Module({
  imports: [
    FitUserModule,
    MongooseModule.forRootAsync(getEnvMongooseOptions()),
    PrismaClientModule,
    QuestionnaireModule,
    TrainingModule
  ]
})
export class AppModule { };
