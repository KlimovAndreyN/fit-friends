import { TrainingRequest } from '../training-request.interface';

export type ICreateTrainingRequestDto = Pick<TrainingRequest, 'userId'>;
