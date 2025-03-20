import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TokenPayload } from '../interfaces/token-payload.interface';
import { BaseUserDto } from '../dto/base-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class TokenPayloadRdo extends PickType(
  BaseUserDto,
  [
    'name',
    'email',
    'role'
  ]
) implements TokenPayload {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public sub: TokenPayload['sub'];

  @ApiProperty(UserApiProperty.ExistQuestionnaire)
  @Expose()
  public existQuestionnaire: BaseUserDto['existQuestionnaire'];
}
