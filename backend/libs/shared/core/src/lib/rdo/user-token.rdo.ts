import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUserTokenRdo } from '../interfaces/rdo/user-token.rdo';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class UserTokenRdo implements IUserTokenRdo {
  @ApiProperty(UserApiProperty.AccessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(UserApiProperty.RefreshToken)
  @Expose()
  public refreshToken: string;
}
