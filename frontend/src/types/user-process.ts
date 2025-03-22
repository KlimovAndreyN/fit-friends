import { UserRole } from '@backend/shared';

import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  isQuestionnaireExecuting: boolean;
  existQuestionnaire: boolean;
  isExistQuestionnaireExecuting: boolean;
  userRole?: UserRole;
}
