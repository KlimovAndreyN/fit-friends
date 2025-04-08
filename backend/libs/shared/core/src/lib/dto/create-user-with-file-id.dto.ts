import { PickType } from '@nestjs/swagger';

import { ICreateBasicUserDto } from '../interfaces/dto/i-create-basic-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class CreateUserWithFileIdDto extends PickType(
  UserApiDoc,
  [
    'name',
    'email',
    'password',
    'birthday',
    'avatarFileId',
    'location',
    'backgroundPath',
    'gender',
    'role'
  ]
)
  implements ICreateBasicUserDto { }
