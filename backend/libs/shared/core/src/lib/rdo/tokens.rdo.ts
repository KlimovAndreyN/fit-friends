import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Tokens } from '../interfaces/tokens.interface';
import { TokenApiProperty } from '../constants/api-property/token.api-property';

export class TokensRdo
  implements Tokens {
  @ApiProperty(TokenApiProperty.AccessToken)
  @Expose()
  public accessToken: Tokens['accessToken'];

  @ApiProperty(TokenApiProperty.RefreshToken)
  @Expose()
  public refreshToken: Tokens['refreshToken'];
}
