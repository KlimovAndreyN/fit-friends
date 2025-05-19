import { IDetailTrainingRdo } from './i-detail-training.rdo';

export type ITrainingRdo = Pick<
  IDetailTrainingRdo,
  'id'
  | 'title'
  | 'backgroundPath'
  | 'specialization'
  | 'price'
  | 'oldPrice'
  | 'caloriesWaste'
  | 'description'
  | 'rating'
  | 'isSpecial'
  | 'createdDate'
>;
