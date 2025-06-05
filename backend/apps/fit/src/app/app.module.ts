import { Module } from '@nestjs/common';

import { FitConfigModule } from '@backend/fit/config';
import { PrismaClientModule } from '@backend/fit/models';
import { TrainingModule } from '@backend/fit/training';
import { OrderModule } from '@backend/fit/order';
import { ReviewModule } from '@backend/fit/review';
import { TrainingRequestModule } from '@backend/fit/training-request';

@Module({
  imports: [
    FitConfigModule,
    PrismaClientModule,
    TrainingModule,
    OrderModule,
    ReviewModule,
    TrainingRequestModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
