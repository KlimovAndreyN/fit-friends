import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';

import { isCoachRole, Role, TrainingRequestStatus } from '@backend/shared/core';

import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestEntity } from './training-request.entity';

const START_TRAINING_REQUEST_STATUS = TrainingRequestStatus.Pending;

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly trainingRequestRepository: TrainingRequestRepository
  ) { }

  public async find(initiatorId: string, userId: string): Promise<TrainingRequestEntity> {
    const entity = await this.trainingRequestRepository.find(initiatorId, userId);

    return entity;
  }

  public async create(
    { userId }: { userId: string; }, //! нужен свой DTO
    initiatorId: string,
    initiatorRole: Role
  ): Promise<TrainingRequestEntity> {
    // обеденить с FitUserProfileServiceюcheckNotAllowForCoach
    if (isCoachRole(initiatorRole)) {
      throw new ForbiddenException('Not allow for coach!');
    }

    const entity = new TrainingRequestEntity({ initiatorId, userId, status: START_TRAINING_REQUEST_STATUS });

    await this.trainingRequestRepository.save(entity);

    return entity;
  }

  public async updateById(
    { status }: { status: TrainingRequestStatus; },//! нужен свой DTO
    id: string,
    userId: string
  ): Promise<TrainingRequestEntity> {
    const foundTrainingRequest = await this.trainingRequestRepository.findById(id);

    if (foundTrainingRequest.userId !== userId) {
      throw new ForbiddenException('Request not your!');
    }

    if (foundTrainingRequest.status === status) {
      throw new ConflictException(`Request status already ${status}!`);
    }

    foundTrainingRequest.status = status;
    await this.trainingRequestRepository.update(foundTrainingRequest);

    return foundTrainingRequest;
  }
}
