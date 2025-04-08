import { IDetailTrainingRdo } from './i-detail-training.rdo';

//! название не очень... может short mini ...
export type IForYouTrainingRdo = Pick<
  IDetailTrainingRdo,
  'id'
  | 'backgroundPath'
  | 'specialization'
>;
