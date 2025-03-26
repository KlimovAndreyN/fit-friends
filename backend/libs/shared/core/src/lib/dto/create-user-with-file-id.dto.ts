import { PickType } from '@nestjs/swagger';

import { ICreateUserWithFileIdDto } from '../interfaces/dto/i-create-user-with-file-id.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class CreateUserWithFileIdDto extends PickType(
  UserApiDoc,
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
)
  implements ICreateUserWithFileIdDto { }
