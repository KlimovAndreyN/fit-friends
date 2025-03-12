import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserApiProperty } from '../constants/api-property/user.api-property';

export class UserTokenRdo {
  @ApiProperty(UserApiProperty.AccessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(UserApiProperty.RefreshToken)
  @Expose()
  public refreshToken: string;
}
