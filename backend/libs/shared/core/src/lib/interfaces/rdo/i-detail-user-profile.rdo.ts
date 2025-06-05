import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';
import { TrainingRequest } from '../training-request.interface';

export interface IDetailUserProfileRdo {
  user: IDetailUserRdo;
  questionnaire: IQuestionnaireRdo;
  isFriend?: boolean;
  personalTrainingRequest?: TrainingRequest
}
