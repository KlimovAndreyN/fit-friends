import { ApiProperty, PickType } from '@nestjs/swagger';

import { ILoggedUserRdo } from '../interfaces/rdo/i-logged-user.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';
import { TokensRdo } from './tokens.rdo';

export class LoggedUserRdo extends
  PickType(
    UserApiDoc,
    [
      'id',
      'name',
      'email',
      'role'
    ]
  )
  implements ILoggedUserRdo {
  @ApiProperty()
  tokens: TokensRdo;
}
