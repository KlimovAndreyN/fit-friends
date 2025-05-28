import { ITrainingQuery } from './i-training.query';

//! что за название ? это какойто расщиренный запрос ITrainingQuery - проверить
export interface ITrainingRepositoryQuery extends ITrainingQuery {
  isSortCreatedDate: boolean;
  isSpecial?: boolean;
  isPopular?: boolean;
}
