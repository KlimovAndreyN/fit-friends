import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { User } from '../interfaces/user.interface';
import { IUserWithFileIdRdo } from '../interfaces/rdo/i-user-with-file-id.rdo';
import { BaseUserDto } from '../dto/base-user.dto';

export class UserWithFileIdRdo
  extends PickType(
    BaseUserDto,
    [
      'id',
      'name',
      'email',
      'birthday',
      'avatarFileId',
      'metroStationName',
      'backgroundPath',
      'gender',
      'role',
      'registrationDate'
    ]
  ) implements IUserWithFileIdRdo {
  //@ApiProperty(UserApiProperty.About)
  @Expose()
  public about?: User['about'];
}
