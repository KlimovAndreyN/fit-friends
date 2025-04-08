import { Training } from '../training.interface';

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
  //coach: IUserRdo;//! убрать userId и добавить coach:{id, name, avatar}
}
