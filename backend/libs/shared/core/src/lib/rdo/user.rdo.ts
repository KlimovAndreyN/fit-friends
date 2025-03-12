import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

import { transformDate } from '../utils/transform';
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

  @ApiProperty(UserApiProperty.AvatarPath)
  @Expose()
  public avatarPath: string;

  @ApiProperty(UserApiProperty.registrationDate)
  @Transform(transformDate)
  @Expose({ name: 'createdAt' })
  public registrationDate: string;
}
