import { PaginationResult } from '../pagination-result.interface';
import { ITrainingRdo } from './i-training.rdo';

export interface ITrainingsWithPaginationRdo
  extends PaginationResult<ITrainingRdo> {
  trainingsMaxPrice: number;
}
