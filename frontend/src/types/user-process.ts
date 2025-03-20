import { ITokenPayloadRdo, UserRole } from '@backend/shared';

import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  isQuestionnaireExecuting: boolean;
  userInfo: ITokenPayloadRdo | null;
  existQuestionnaire: boolean;
  userRole?: UserRole;
}
