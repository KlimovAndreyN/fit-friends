import { Role } from '@backend/shared/core';

import { AuthorizationStatus } from '../types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  userRole: Role;

  prevLocation: string;

  isIndexPageActivate: boolean;
}
