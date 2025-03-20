import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUserRdo } from '../interfaces/rdo/i-user.rdo';
import { UserProp } from '../interfaces/user.interface';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserWithFileIdRdo } from './user-with-file-id.rdo';

export class UserRdo extends OmitType(UserWithFileIdRdo, ['avatarFileId']) implements IUserRdo {
  @ApiProperty(UserApiProperty.AvatarSrc)
  @Expose()
  public [UserProp.AvatarSrc]: IUserRdo[UserProp.AvatarSrc];
}
