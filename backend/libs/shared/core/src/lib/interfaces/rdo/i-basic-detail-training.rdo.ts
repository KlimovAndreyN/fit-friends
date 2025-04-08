import { Training } from '../training.interface';

export interface IBasicDetailTrainingRdo
  extends Pick<
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
  > {
  createdDate: string;
}
