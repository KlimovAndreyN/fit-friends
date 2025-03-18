import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { transformDate } from '../utils/transform';
import { UserProp } from '../interfaces/user.interface';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class UserRdo {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public id: string;

  @ApiProperty(UserApiProperty.Email)
  @Expose()
  public email: string;

  @ApiProperty(UserApiProperty.Name)
  @Expose()
  public name: string;

  //!@ApiProperty(UserApiProperty.AvatarPath)
  //!@Expose()
  //!public avatarPath: string;

  @ApiProperty(UserApiProperty.RegistrationDate)
  @Transform(transformDate)
  @Expose({ name: UserProp.CreatedAt })
  public [UserProp.RegistrationDate]: string; //! userprop
}
