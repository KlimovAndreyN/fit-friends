import { ITrainingRequestRdo } from './i-training-request.rdo';
import { IUserProfileRdo } from './i-user-profile.rdo';

export interface IFriendProfileRdo
  extends IUserProfileRdo {
  outJointTraining?: ITrainingRequestRdo;
  inJointTraining?: ITrainingRequestRdo;
  personalTraining?: ITrainingRequestRdo;
}
