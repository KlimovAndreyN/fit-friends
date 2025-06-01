import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';

export interface IAccountInfoRdo {
  user: IDetailUserRdo;
  questionnaire: IQuestionnaireRdo;
}
