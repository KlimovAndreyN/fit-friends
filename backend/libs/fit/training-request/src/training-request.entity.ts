import { Entity, StorableEntity, TrainingRequest } from '@backend/shared/core';

export class TrainingRequestEntity extends Entity implements StorableEntity<TrainingRequest> {
  public initiatorId: TrainingRequest['initiatorId'];
  public userId: TrainingRequest['userId'];
  public status: TrainingRequest['status'];
  public createdAt?: TrainingRequest['createdAt'];
  public updatedAt?: TrainingRequest['updatedAt'];

  constructor(trainingRequest?: TrainingRequest) {
    super();

    this.populate(trainingRequest);
  }

  public populate(trainingRequest?: TrainingRequest): void {
    if (!trainingRequest) {
      return;
    }

    this.id = trainingRequest.id ?? undefined;
    this.initiatorId = trainingRequest.initiatorId;
    this.userId = trainingRequest.userId;
    this.status = trainingRequest.status;
    this.createdAt = trainingRequest.createdAt ?? undefined;
    this.updatedAt = trainingRequest.updatedAt ?? undefined;
  }

  public toPOJO(): TrainingRequest {
    return {
      id: this.id,
      initiatorId: this.initiatorId,
      userId: this.userId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
