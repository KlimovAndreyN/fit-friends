import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';
import { ITrainingRequestRdo } from './i-training-request.rdo';

export interface IDetailUserProfileRdo {
  user: IDetailUserRdo;
  questionnaire: IQuestionnaireRdo;
  isFriend?: boolean;
  personalTrainingRequest?: ITrainingRequestRdo
}
