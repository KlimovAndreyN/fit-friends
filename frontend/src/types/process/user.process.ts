import { ITokenPayload } from '@backend/shared/core';

import { AuthorizationStatus } from '../types';
import { AppRoute } from '../../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  isSingUpExecuting: boolean;
  userInfo: ITokenPayload;

  prevLocation: AppRoute;

  isIndexPageActivate: boolean;
}
