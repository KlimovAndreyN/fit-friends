import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserProp } from '../interfaces/user.interface';
import { TokenPayload, TokenPayloadProp } from '../interfaces/token-payload.interface';
import { BaseUserDto } from '../dto/base-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class TokenPayloadRdo extends PickType(
  BaseUserDto,
  [
    'name',
    'email',
    UserProp.Role
  ]
) implements TokenPayload {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public [TokenPayloadProp.Sub]: TokenPayload[TokenPayloadProp.Sub];

  @ApiProperty(UserApiProperty.ExistQuestionnaire)
  @Expose()
  public [UserProp.ExistQuestionnaire]: BaseUserDto[UserProp.ExistQuestionnaire];
}
