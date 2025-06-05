import { ITrainingRequestRdo } from './i-training-request.rdo';
import { IUserProfileRdo } from './i-user-profile.rdo';

export interface IFriendProfileRdo
  extends IUserProfileRdo {
  outJointTrainingRequest?: ITrainingRequestRdo;
  inJointTrainingRequest?: ITrainingRequestRdo;
  personalTrainingRequest?: ITrainingRequestRdo;
}
