import { ITrainingQuery } from './i-training.query';

export interface ITrainingRepository extends ITrainingQuery {
  isSortCreatedDate: boolean;
  isSpecial?: boolean;
  isPopular?: boolean;
}
