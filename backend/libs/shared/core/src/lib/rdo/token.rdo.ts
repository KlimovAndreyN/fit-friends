import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Token } from '../interfaces/token.interface';
import { TokenApiProperty } from '../constants/api-property/token.api-property';

export class TokenRdo
  implements Token {
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public accessToken: Token['accessToken'];

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public refreshToken: Token['refreshToken'];
}
