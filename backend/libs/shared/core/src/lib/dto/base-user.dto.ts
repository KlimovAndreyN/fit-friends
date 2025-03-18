import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { User, UserProp } from '../interfaces/user.interface';
import { ICreateUserDto } from '../interfaces/dto/i-create-user.dto';
import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

export class BaseUserDto {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public [UserProp.Id]: User[UserProp.Id];

  @ApiProperty(UserApiProperty.Name)
  @Expose()
  @IsString()
  @MinLength(UserValidation.Name.MinLength)
  @MaxLength(UserValidation.Name.MaxLength)
  public [UserProp.Name]: User[UserProp.Name];

  @ApiProperty(UserApiProperty.Email)
  @Expose()
  @IsEmail({})
  public [UserProp.Email]: User[UserProp.Email];

  @ApiProperty(UserApiProperty.Password)
  @Expose()
  @IsString()
  @MinLength(UserValidation.Password.MinLength)
  @MaxLength(UserValidation.Password.MaxLength)
  public [UserProp.Password]: ICreateUserDto[UserProp.Password];

  @ApiProperty(UserApiProperty.Birthday) //! проверять описать формат '2005-01-20'
  @Expose()
  @IsString()
  @IsOptional()
  public [UserProp.Birthday]?: string;

  @ApiProperty(UserApiProperty.AvatarFileId)
  @Expose()
  @IsOptional()
  public [UserProp.AvatarFileId]?: User[UserProp.AvatarFileId];

  @ApiProperty(UserApiProperty.AvatarFile)
  @Expose()
  @IsOptional()
  public [UserProp.AvatarFile]?: File;

  @ApiProperty(UserApiProperty.MetroStationName)
  @Expose()
  @IsEnum(MetroStationName)
  public [UserProp.MetroStationName]: User[UserProp.MetroStationName];

  @ApiProperty(UserApiProperty.BackgroundPath) //! сделать проверку пути
  @Expose()
  @IsString()
  public [UserProp.BackgroundPath]: User[UserProp.BackgroundPath];

  @ApiProperty(UserApiProperty.Gender)
  @Expose()
  @IsEnum(UserGender)
  public [UserProp.Gender]: User[UserProp.Gender];

  @ApiProperty(UserApiProperty.Role)
  @Expose()
  @IsEnum(UserRole)
  public [UserProp.Role]: User[UserProp.Role];
}
