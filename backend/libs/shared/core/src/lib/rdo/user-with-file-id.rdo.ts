import { PickType } from '@nestjs/swagger';

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
  ) implements IUserWithFileIdRdo { }
