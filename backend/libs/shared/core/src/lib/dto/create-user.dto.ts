import { PickType } from '@nestjs/swagger';

import { UserProp } from '../interfaces/user.interface';
import { ICreateUserDto } from '../interfaces/dto/i-create-user.dto';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends PickType(
  BaseUserDto,
  [
    UserProp.Name,
    UserProp.Email,
    UserProp.Password,
    UserProp.Birthday,
    UserProp.AvatarFileId,
    UserProp.MetroStationName,
    UserProp.BackgroundPath,
    UserProp.Gender,
    UserProp.Role
  ]
) implements ICreateUserDto { }
