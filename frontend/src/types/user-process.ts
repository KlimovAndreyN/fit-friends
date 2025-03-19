import { ITokenPayloadRdo } from '@backend/shared';

import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  isSingInExecuting: boolean;
  userInfo: ITokenPayloadRdo | null;
}
