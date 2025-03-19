import { PickType } from '@nestjs/swagger';

import { IUserWithFileIdRdo } from '../interfaces/rdo/i-user-with-file-id.rdo';
import { UserProp } from '../interfaces/user.interface';
import { BaseUserDto } from '../dto/base-user.dto';

export class UserWithFileIdRdo
  extends PickType(
    BaseUserDto,
    [
      UserProp.Id,
      UserProp.Name,
      UserProp.Email,
      UserProp.Birthday,
      UserProp.AvatarFileId,
      UserProp.MetroStationName,
      UserProp.BackgroundPath,
      UserProp.Gender,
      UserProp.Role,
      UserProp.RegistrationDate
    ]
  ) implements IUserWithFileIdRdo { }
