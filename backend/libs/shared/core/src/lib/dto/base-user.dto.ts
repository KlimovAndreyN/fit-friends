import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { UserProp } from '../interfaces/user.interface';
import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

export class BaseUserDto {
  @ApiProperty(UserApiProperty.Name)
  @IsString()
  @MinLength(UserValidation.Name.MinLength)
  @MaxLength(UserValidation.Name.MaxLength)
  public [UserProp.Name]: string;

  @ApiProperty(UserApiProperty.Email)
  @IsEmail({})
  public [UserProp.Email]: string;

  @ApiProperty(UserApiProperty.Password)
  @IsString()
  @MinLength(UserValidation.Password.MinLength)
  @MaxLength(UserValidation.Password.MaxLength)
  public [UserProp.Password]: string;

  //! остальное описать
  @IsOptional()
  birthday?: string;

  @IsOptional()
  avatarFileId?: string;

  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  avatarFile?: string;

  metroStationName: MetroStationName;
  backgroundPath: string;
  gender: UserGender;
  role: UserRole;
}
