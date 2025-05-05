import { Training } from '../training.interface';

export type ICreateBasicTrainingDto = Pick<
  Training,
  'title'
  | 'backgroundPath'
  | 'trainingLevel'
  | 'specialization'
  | 'duration'
  | 'price'
  | 'caloriesWaste'
  | 'description'
  | 'gender'
  | 'videoFileId'
>;
