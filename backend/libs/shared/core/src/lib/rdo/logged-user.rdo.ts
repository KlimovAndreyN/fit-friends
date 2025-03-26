import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Token } from '../interfaces/token.interface';
import { ILoggedUserRdo } from '../interfaces/rdo/i-logged-user.rdo';
import { TokenApiProperty } from '../constants/api-property/token.api-property';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

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
  //! попробовать сделать объект tokens: TokenRdo...
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public accessToken: Token['accessToken'];

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public refreshToken: Token['refreshToken'];
}
