import { PickType } from '@nestjs/swagger';

import { IUserWithFileIdRdo } from '../interfaces/rdo/i-user-with-file-id.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UserWithFileIdRdo
  extends PickType(
    UserApiDoc,
    [
      'id',
      'name',
      'about',
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
