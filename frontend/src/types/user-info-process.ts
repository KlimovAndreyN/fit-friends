import { IUserInfoRdo } from '@backend/shared';

export type UserInfoProcess = {
  isFetchUserInfoExecuting: boolean;
  isReadyForTrainingChangeExecuting: boolean;
  userInfo: IUserInfoRdo | null;
  readyForTraining?: boolean;
}
