import { IUserRdo } from './i-user.rdo';
import { IQuestionnaireRdo } from './i-questionnaire.rdo';

export interface IUserInfoRdo extends
  Pick<IUserRdo, 'name' | 'avatarPath' | 'about' | 'gender' | 'metroStationName'>,
  //! нужно что то одно 'caloriesLose' 'caloriesWaste'
  Pick<IQuestionnaireRdo, 'specializations' | 'level' | 'caloriesLose' | 'caloriesWaste'> {
  readyForTraining: boolean;//! может в Questionnaire? или отдельная таблица
}
