import { TrainingRequestStatus } from '../../types/training-request-status.enum';
import { IUserProfileRdo } from './i-user-profile.rdo';

export interface IFriendRdo
  extends IUserProfileRdo {
  outJointTrainingStatus?: TrainingRequestStatus;
  inMyJointTrainingStatus?: TrainingRequestStatus;
  personalTrainingStatus?: TrainingRequestStatus;
}
