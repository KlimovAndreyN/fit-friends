import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ILoggedUserRdo } from '../interfaces/rdo/i-logged-user.rdo';
import { BaseUserDto } from '../dto/base-user.dto';
import { TokenApiProperty } from '../constants/api-property/token.api-property';
import { UserProp } from '../interfaces/user.interface';
import { Token, TokenProp } from '../interfaces/token.interface';

export class LoggedUserRdo extends
  PickType(
    BaseUserDto,
    [
      'id',
      'name',
      'email',
      UserProp.Role,
      UserProp.ExistQuestionnaire
    ]
  )
  implements ILoggedUserRdo {
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public [TokenProp.AccessToken]: Token[TokenProp.AccessToken];

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public [TokenProp.RefreshToken]: Token[TokenProp.RefreshToken];
}
