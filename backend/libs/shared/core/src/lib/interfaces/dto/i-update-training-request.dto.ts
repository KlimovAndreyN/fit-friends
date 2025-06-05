import { TrainingRequest } from '../training-request.interface';

export type IUpdateTrainingRequestDto = Pick<TrainingRequest, 'status'>;
