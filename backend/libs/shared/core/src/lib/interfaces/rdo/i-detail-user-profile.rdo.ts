import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';

export interface IDetailUserProfileRdo {
  user: IDetailUserRdo;
  questionnaire: IQuestionnaireRdo;
}
