import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TokenPayload } from '../interfaces/token-payload.interface';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class TokenPayloadRdo extends PickType(
  UserApiDoc,
  [
    'name',
    'email',
    'role'
  ]
) implements TokenPayload {
  //! пенести sub в UserApiDoc
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public sub: TokenPayload['sub'];
}
