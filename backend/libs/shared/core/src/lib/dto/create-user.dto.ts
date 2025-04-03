import { PickType } from '@nestjs/swagger';

import { AVATAR_FILE_PROPERTY, ICreateUserDto } from '../interfaces/dto/i-create-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class CreateUserDto
  extends PickType(
    UserApiDoc,
    [
      'name',
      'email',
      'password',
      'birthday',
      AVATAR_FILE_PROPERTY,
      'location',
      'backgroundPath',
      'gender',
      'role'
    ]
  )
  implements ICreateUserDto {
}
