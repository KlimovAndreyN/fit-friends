import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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

  @ApiProperty(UserApiProperty.Birthday) //! проверять описать формат '2005-01-20'
  @IsString()
  @IsOptional()
  public [UserProp.Birthday]?: string;

  @ApiProperty(UserApiProperty.AvatarFileId)
  @IsOptional()
  public [UserProp.AvatarFileId]?: string;

  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public [UserProp.AvatarFile]?: File;

  @ApiProperty(UserApiProperty.MetroStationName)
  @IsEnum(MetroStationName)
  public [UserProp.MetroStationName]: string;

  @ApiProperty(UserApiProperty.BackgroundPath)
  public [UserProp.BackgroundPath]: string;

  @ApiProperty(UserApiProperty.Gender)
  @IsEnum(UserGender)
  public [UserProp.Gender]: string;

  @ApiProperty(UserApiProperty.Role)
  @IsEnum(UserRole)
  public [UserProp.Role]: string;
}
