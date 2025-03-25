import { IUserInfoRdo, UserRole } from '@backend/shared';

import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  isExistQuestionnaireExecuting: boolean;
  isCreateQuestionnaireExecuting: boolean;
  isFetchUserInfoExecuting: boolean;
  existQuestionnaire: boolean;
  userRole: UserRole; //! ? | null;
  userInfo: IUserInfoRdo | null;
}
