import { UserRole } from '@backend/shared';

import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  isExistQuestionnaireExecuting: boolean;
  isCreateQuestionnaireExecuting: boolean;
  existQuestionnaire: boolean;
  userRole?: UserRole;
}
