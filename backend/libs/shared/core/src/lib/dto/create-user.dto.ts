import { PickType } from '@nestjs/swagger';

import { ICreateUserDto } from '../interfaces/dto/i-create-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class CreateUserDto
  extends PickType(
    UserApiDoc,
    [
      'name',
      'email',
      'password',
      'birthday',
      'avatarFile',
      'location',
      'backgroundPath',
      'gender',
      'role'
    ]
  )
  implements ICreateUserDto {
}
