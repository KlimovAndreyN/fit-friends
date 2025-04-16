import { ITrainingQuery } from './i-training.query';

export interface ITrainingRepository extends ITrainingQuery {
  isSpecial?: boolean;
  isPopular?: boolean;
}
