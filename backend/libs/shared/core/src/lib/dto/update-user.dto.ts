import { PartialType, PickType } from '@nestjs/swagger';

import { AVATAR_FILE_PROPERTY } from '../interfaces/dto/i-create-user.dto';
import { IUpdateUserDto } from '../interfaces/dto/i-update-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UpdateUserDto
  extends PickType(
    PartialType(UserApiDoc),
    [
      'name',
      'about',
      AVATAR_FILE_PROPERTY,
      'emptyAvatarFile',
      'location',
      'gender'
    ]
  )
  implements IUpdateUserDto { }
