import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getEnvMongooseOptions } from '@backend/shared/helpers';
import { FitUserModule } from '@backend/account/fit-user';
import { PrismaClientModule } from '@backend/fit/models';
import { QuestionnaireModule } from '@backend/fit/questionnaire';
import { TrainingModule } from '@backend/fit/training';
import { OrderModule } from '@backend/fit/order';
import { ReviewModule } from '@backend/fit/review';

@Module({
  imports: [
    FitUserModule,
    MongooseModule.forRootAsync(getEnvMongooseOptions()),
    PrismaClientModule,
    QuestionnaireModule,
    TrainingModule,
    OrderModule,
    ReviewModule
  ]
})
export class AppModule { };
