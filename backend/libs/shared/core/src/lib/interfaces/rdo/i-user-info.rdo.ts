import { IUserRdo } from './i-user.rdo';
import { IQuestionnaireRdo } from './i-questionnaire.rdo';

export interface IUserInfoRdo extends
  Pick<IUserRdo, 'name' | 'avatarPath' | 'about' | 'gender' | 'metroStationName'>,
//! нужно что то одно 'caloriesLose' 'caloriesWaste'
  Pick<IQuestionnaireRdo, 'specialisations' | 'level' | 'caloriesLose' | 'caloriesWaste'> {
  ready: boolean;
}
