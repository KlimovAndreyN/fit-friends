import { Module } from '@nestjs/common';

import { TrainingRequestController } from './training-request.controller';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestService } from './training-request.service';

@Module({
  controllers: [TrainingRequestController],
  providers: [
    TrainingRequestService,
    TrainingRequestRepository,
    TrainingRequestFactory
  ]
})
export class TrainingRequestModule { }
