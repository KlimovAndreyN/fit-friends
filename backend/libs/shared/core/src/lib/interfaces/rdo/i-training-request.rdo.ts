import { TrainingRequest } from '../training-request.interface';

export interface ITrainingRequestRdo
  extends Pick<
    Required<TrainingRequest>,
    'id' | 'status'
  > {
  updatedAt: string;
}
