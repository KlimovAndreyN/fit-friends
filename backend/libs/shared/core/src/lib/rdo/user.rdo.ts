import { PickType } from '@nestjs/swagger';

import { IUserRdo } from '../interfaces/rdo/i-user.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UserRdo
  extends PickType(
    UserApiDoc,
    [
      'id',
      'name',
      'avatarFilePath'
    ]
  )
  implements IUserRdo { }
