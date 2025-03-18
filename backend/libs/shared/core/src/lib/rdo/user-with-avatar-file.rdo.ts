import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUserWithAvatarFileRdo } from '../interfaces/rdo/i-user-with-avarat-file.rdo';
import { UserProp } from '../interfaces/user.interface';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserRdo } from './user.rdo';

export class UserWithAvatarFileRdo extends OmitType(UserRdo, [UserProp.AvatarFileId]) implements IUserWithAvatarFileRdo {
  @ApiProperty(UserApiProperty.AvatarSrc)
  @Expose()
  public [UserProp.AvatarSrc]: IUserWithAvatarFileRdo[UserProp.AvatarSrc];
}
