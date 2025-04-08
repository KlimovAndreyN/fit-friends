import { PartialType, PickType } from '@nestjs/swagger';

import { IUpdateBasicUserDto } from '../interfaces/dto/i-update-basic-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UpdateUserWithFileIdDto
  extends PickType(
    PartialType(UserApiDoc),
    [
      'name',
      'about',
      'avatarFileId',
      'location',
      'gender'
    ]
  )
  implements IUpdateBasicUserDto { }
