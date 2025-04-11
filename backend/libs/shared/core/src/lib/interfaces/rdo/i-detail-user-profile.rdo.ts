import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';

export interface IDetailUserInfoRdo {
  user: IDetailUserRdo;
  questionnaire: IQuestionnaireRdo;
}
