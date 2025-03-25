import { IUserInfoRdo } from '@backend/shared';

export type UserInfoProcess = {
  isFetchUserInfoExecuting: boolean;
  userInfo: IUserInfoRdo | null;
}
