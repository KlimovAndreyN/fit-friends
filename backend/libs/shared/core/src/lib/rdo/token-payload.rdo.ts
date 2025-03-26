import { PickType } from '@nestjs/swagger';

import { TokenPayload } from '../interfaces/token-payload.interface';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class TokenPayloadRdo extends PickType(
  UserApiDoc,
  [
    'sub',
    'name',
    'email',
    'role'
  ]
) implements TokenPayload { }
