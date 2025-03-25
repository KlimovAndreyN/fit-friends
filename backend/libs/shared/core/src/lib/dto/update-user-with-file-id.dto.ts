import { PartialType, PickType } from '@nestjs/swagger';

import { IUpdateUserWithFileIdDto } from '../interfaces/dto/i-update-user-with-file-id.dto';
import { BaseUserDto } from './base-user.dto';

export class UpdateUserWithFileIdDto extends PickType(
  PartialType(BaseUserDto),
  [
    'name',
    'about',
    'avatarFileId',
    'metroStationName',
    'gender'
  ]
) implements IUpdateUserWithFileIdDto { }
