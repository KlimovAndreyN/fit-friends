import { PickType } from '@nestjs/swagger';

import { Token } from '../interfaces/token.interface';
import { LoggedUserRdo } from './logged-user.rdo';

export class TokenRdo
  extends PickType(
    LoggedUserRdo,
    [
      'accessToken',
      'refreshToken'
    ]
  ) implements Token { }
