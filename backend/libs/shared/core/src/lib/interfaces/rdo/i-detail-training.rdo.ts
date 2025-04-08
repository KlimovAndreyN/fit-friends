import { Training } from '../training.interface';
import { IUserRdo } from './i-user.rdo';

export interface IDetailTrainingRdo
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
    | 'rating'
    | 'isSpecial'
    | 'createdAt'
  > {
  videoFilePath: string;
  coach: IUserRdo;
}
