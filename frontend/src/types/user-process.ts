import { ITokenPayloadRdo } from '@backend/shared';

import { AuthorizationStatus } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: ITokenPayloadRdo | null;
}
