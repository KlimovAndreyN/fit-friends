import { IDetailTrainingRdo } from './i-detail-training.rdo';

export type ITrainingRdo = Pick<
  IDetailTrainingRdo,
  'id'
  | 'title'
  | 'backgroundPath'
  | 'price'
  | 'description'
  | 'isSpecial'
  | 'createdDate'
>;
