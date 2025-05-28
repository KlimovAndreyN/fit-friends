import { Role } from '@backend/shared/core';

import { AuthorizationStatus } from '../types';
import { AppRoute } from '../../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  userRole: Role;

  prevLocation: AppRoute;

  isIndexPageActivate: boolean;
}
