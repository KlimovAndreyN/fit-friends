import { PickType } from '@nestjs/swagger';

import { Token, TokenProp } from '../interfaces/token.interface';
import { LoggedUserRdo } from './logged-user.rdo';

export class UserTokenRdo
  extends PickType(
    LoggedUserRdo,
    [TokenProp.AccessToken, TokenProp.RefreshToken]
  ) implements Token { }
