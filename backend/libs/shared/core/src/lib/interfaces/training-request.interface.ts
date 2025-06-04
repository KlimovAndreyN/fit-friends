import { TrainingRequestStatus } from '../types/training-request-status.enum';

export interface TrainingRequest {
  id?: string;
  initiatorId: string;
  userId: string;
  status: TrainingRequestStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
