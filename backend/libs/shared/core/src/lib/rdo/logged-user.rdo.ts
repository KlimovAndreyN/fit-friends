import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Token } from '../interfaces/token.interface';
import { ILoggedUserRdo } from '../interfaces/rdo/i-logged-user.rdo';
import { BaseUserDto } from '../dto/base-user.dto';
import { TokenApiProperty } from '../constants/api-property/token.api-property';

export class LoggedUserRdo extends
  PickType(
    BaseUserDto,
    [
      'id',
      'name',
      'email',
      'role'
    ]
  )
  implements ILoggedUserRdo {
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public accessToken: Token['accessToken'];

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public refreshToken: Token['refreshToken'];
}
