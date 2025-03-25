import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IUserRdo } from './i-user.rdo';

export interface IUserInfoRdo {
  user: IUserRdo;
  questionnaire: IQuestionnaireRdo;
}
