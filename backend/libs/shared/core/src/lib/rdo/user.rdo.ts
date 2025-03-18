import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { transformDate } from '../utils/transform';
import { IUserWithFileIdRdo } from '../interfaces/rdo/i-user.rdo';
import { UserProp } from '../interfaces/user.interface';
import { BaseUserDto } from '../dto/base-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';

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
      UserProp.Role
    ]
  ) implements IUserWithFileIdRdo {
  @ApiProperty(UserApiProperty.RegistrationDate)
  @Transform(transformDate)
  @Expose({ name: UserProp.CreatedAt })
  public [UserProp.RegistrationDate]: IUserWithFileIdRdo[UserProp.RegistrationDate];
}
