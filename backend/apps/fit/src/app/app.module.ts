import { Module } from '@nestjs/common';

import { FitConfigModule } from '@backend/fit/config';
import { PrismaClientModule } from '@backend/fit/models';
import { TrainingModule } from '@backend/fit/training';
import { OrderModule } from '@backend/fit/order';
import { ReviewModule } from '@backend/fit/review';

@Module({
  imports: [
    FitConfigModule,
    PrismaClientModule,
    TrainingModule,
    OrderModule,
    ReviewModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
