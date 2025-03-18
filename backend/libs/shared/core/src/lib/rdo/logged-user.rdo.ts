import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ILoggedUserRdo } from '../interfaces/rdo/i-logged-user.rdo';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { TokenApiProperty } from '../constants/api-property/token.api-property';

export class LoggedUserRdo implements ILoggedUserRdo {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public id: string;

  @ApiProperty(UserApiProperty.Email)
  @Expose()
  public email: string;

  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public refreshToken: string;
}
