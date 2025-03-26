import { PartialType, PickType } from '@nestjs/swagger';

import { IUpdateUserWithFileIdDto } from '../interfaces/dto/i-update-user-with-file-id.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class UpdateUserWithFileIdDto extends PickType(
  PartialType(UserApiDoc),
  [
    'name',
    'about',
    'avatarFileId',
    'metroStationName',
    'gender'
  ]
) implements IUpdateUserWithFileIdDto { }
