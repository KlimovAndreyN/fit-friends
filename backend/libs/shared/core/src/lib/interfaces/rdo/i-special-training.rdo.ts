import { IDetailTrainingRdo } from './i-detail-training.rdo';

export type ISpecialTrainingRdo = Pick<
  IDetailTrainingRdo,
  'id'
  | 'title'
  | 'backgroundPath'
  | 'price'
  | 'description'
  | 'isSpecial'
  | 'createdDate'
>;
