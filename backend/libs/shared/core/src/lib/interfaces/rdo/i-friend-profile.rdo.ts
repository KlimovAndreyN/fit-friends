import { TrainingRequestStatus } from '../../types/training-request-status.enum';
import { IUserProfileRdo } from './i-user-profile.rdo';

export interface IFriendProfileRdo
  extends IUserProfileRdo {
  outJointTrainingStatus?: TrainingRequestStatus;
  inJointTrainingStatus?: TrainingRequestStatus;
  personalTrainingStatus?: TrainingRequestStatus;
}
