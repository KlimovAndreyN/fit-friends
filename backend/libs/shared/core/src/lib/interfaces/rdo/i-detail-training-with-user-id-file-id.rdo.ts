import { Training } from '../training.interface';

export type IDetailTrainingWithUserIdFileIdRdo = Pick<
  Training,
  'id'
  | 'title'
  | 'backgroundPath'
  | 'trainingLevel'
  | 'specialization'
  | 'duration'
  | 'price'
  | 'caloriesWaste'
  | 'description'
  | 'gender'
  | 'videoFileId'
  | 'rating'
  | 'userId'
  | 'isSpecial'
  | 'createdAt'
>;
