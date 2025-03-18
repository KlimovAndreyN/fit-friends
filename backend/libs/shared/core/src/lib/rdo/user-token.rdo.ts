import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TokenProp } from '../interfaces/token.interface';
import { IUserTokenRdo } from '../interfaces/rdo/i-user-token.rdo';
import { TokenApiProperty } from '../constants/api-property/token.api-property';

export class UserTokenRdo implements IUserTokenRdo {
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public [TokenProp.AccessToken]: string;

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public [TokenProp.RefreshToken]: string;
}
