import { IDetailTrainingRdo } from './i-detail-training.rdo';

export type IForYouTrainingRdo = Pick<
  IDetailTrainingRdo,
  'id'
  | 'backgroundPath'
  | 'specialization'
>;
