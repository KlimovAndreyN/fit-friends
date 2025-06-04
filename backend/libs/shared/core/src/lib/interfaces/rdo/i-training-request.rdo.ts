import { TrainingRequest } from '../training-request.interface';

export type ITrainingRequestRdo = Pick<
  Required<TrainingRequest>,
  'id'
  | 'status'
  | 'updatedAt'
>;
