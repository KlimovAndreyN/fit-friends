import { PartialType, PickType } from '@nestjs/swagger';

import { IUpdateUserDto } from '../interfaces/dto/i-update-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UpdateUserDto
  extends PickType(
    PartialType(UserApiDoc),
    [
      'name',
      'about',
      'avatarFile',
      'emptyAvatarFile',
      'metroStationName',
      'gender'
    ]
  )
  implements IUpdateUserDto { }
