import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ITokenPayloadRdo } from '../interfaces/rdo';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class TokenPayloadRdo implements ITokenPayloadRdo {
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
