import { PickType } from '@nestjs/swagger';

import { ICreateUserWithFileIdDto } from '../interfaces/dto/i-create-user-with-file-id.dto';
import { BaseUserDto } from './base-user.dto';

export class CreateUserWithFileIdDto extends PickType(
  BaseUserDto,
  [
    'name',
    'email',
    'password',
    'birthday',
    'avatarFileId',
    'metroStationName',
    'backgroundPath',
    'gender',
    'role'
  ]
) implements ICreateUserWithFileIdDto { }
