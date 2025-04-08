import { PickType } from '@nestjs/swagger';

import { IDetailUserRdo } from '../interfaces/rdo/i-detail-user.rdo';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class DetailUserRdo
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
  implements IDetailUserRdo {
}
