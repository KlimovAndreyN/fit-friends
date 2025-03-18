import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Token, TokenProp } from '../interfaces/token.interface';
import { TokenApiProperty } from '../constants/api-property/token.api-property';

export class UserTokenRdo implements Token {
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public [TokenProp.AccessToken]: string;

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public [TokenProp.RefreshToken]: string;
}
