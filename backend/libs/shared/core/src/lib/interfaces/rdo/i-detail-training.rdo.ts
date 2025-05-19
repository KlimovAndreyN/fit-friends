import { IBasicDetailTrainingRdo } from './i-basic-detail-training.rdo';
import { IUserRdo } from './i-user.rdo';

export interface IDetailTrainingRdo
  extends Pick<
    IBasicDetailTrainingRdo,
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
    | 'createdDate'
  > {
  videoFilePath: string;
  coach: IUserRdo;
}
