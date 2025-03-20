import { PickType } from '@nestjs/swagger';

import { UserProp } from '../interfaces/user.interface';
import { ICreateUserWithFileIdDto } from '../interfaces/dto/i-create-user-with-file-id.dto';
import { BaseUserDto } from './base-user.dto';

export class CreateUserWithFileIdDto extends PickType(
  BaseUserDto,
  [
    'name',
    'email',
    UserProp.Password,
    'birthday',
    UserProp.AvatarFileId,
    UserProp.MetroStationName,
    UserProp.BackgroundPath,
    UserProp.Gender,
    UserProp.Role
  ]
) implements ICreateUserWithFileIdDto { }
