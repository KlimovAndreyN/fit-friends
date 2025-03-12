import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserApiProperty } from '../constants/api-property/user.api-property';

export class TokenPayloadRdo {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public sub: string;

  @ApiProperty(UserApiProperty.Email)
  @Expose()
  public email: string;

  @ApiProperty(UserApiProperty.Name)
  @Expose()
  public name: string;
}
