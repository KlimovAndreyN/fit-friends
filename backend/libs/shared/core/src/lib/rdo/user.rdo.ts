import { PickType } from '@nestjs/swagger';

import { IUserRdo } from '../interfaces/rdo/i-user.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UserRdo
  extends PickType(
    UserApiDoc,
    [
      'id',
      'name',
      'about',
      'email',
      'birthday',
      'avatarFilePath',
      'location',
      'backgroundPath',
      'gender',
      'role',
      'registrationDate'
    ]
  )
  implements IUserRdo {
}
