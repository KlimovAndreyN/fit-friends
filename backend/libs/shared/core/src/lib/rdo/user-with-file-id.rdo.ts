import { PickType } from '@nestjs/swagger';

import { IBasicDetailUserRdo } from '../interfaces/rdo/i-basic-detail-user.rdo';
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
      'location',
      'backgroundPath',
      'gender',
      'role',
      'registrationDate'
    ]
  )
  implements IBasicDetailUserRdo { }
