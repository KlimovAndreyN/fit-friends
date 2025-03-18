import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IUserRdo } from '../interfaces/rdo/i-user-with-avarat-file.rdo';
import { UserProp } from '../interfaces/user.interface';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserWithFileIdRdo } from './user.rdo';

export class UserRdo extends OmitType(UserWithFileIdRdo, [UserProp.AvatarFileId]) implements IUserRdo {
  @ApiProperty(UserApiProperty.AvatarSrc)
  @Expose()
  public [UserProp.AvatarSrc]: IUserRdo[UserProp.AvatarSrc];
}
