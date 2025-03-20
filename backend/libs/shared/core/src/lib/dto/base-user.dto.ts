import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { User, UserProp } from '../interfaces/user.interface';
import { ICreateUserWithFileIdDto } from '../interfaces/dto/i-create-user-with-file-id.dto';
import { IUserWithFileIdRdo } from '../interfaces/rdo/i-user-with-file-id.rdo';
import { CreateUserDto } from './create-user-with-avatar-file.dto';
import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';
import { transformDate } from '../utils/transform';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

//! название и размещение не очень... используется для описания, валидации и трансформации dto и rdo
// UserApiDoc
export class BaseUserDto {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public id: User['id'];

  @ApiProperty(UserApiProperty.Name)
  @Expose()
  @IsString()
  @MinLength(UserValidation.Name.MinLength)
  @MaxLength(UserValidation.Name.MaxLength)
  public name: User['name'];

  @ApiProperty(UserApiProperty.Email)
  @Expose()
  @IsEmail({})
  public email: User['email'];

  @ApiProperty(UserApiProperty.Password)
  @Expose()
  @IsString()
  @MinLength(UserValidation.Password.MinLength)
  @MaxLength(UserValidation.Password.MaxLength)
  public password: ICreateUserWithFileIdDto['password'];

  @ApiProperty(UserApiProperty.Birthday)
  @Expose()
  @IsDateString()
  @IsOptional()
  public birthday?: ICreateUserWithFileIdDto['birthday'];

  @ApiProperty(UserApiProperty.AvatarFileId)
  @Expose()
  @IsOptional()
  public avatarFileId?: User['avatarFileId'];

  @ApiProperty(UserApiProperty.AvatarFile)
  @Expose()
  @IsOptional()
  public 'avatarFile'?: CreateUserDto['avatarFile']

  @ApiProperty(UserApiProperty.MetroStationName)
  @Expose()
  @IsEnum(MetroStationName)
  public metroStationName: User['metroStationName'];

  @ApiProperty(UserApiProperty.BackgroundPath) //! сделать проверку пути
  @Expose()
  @IsString()
  public backgroundPath: User['backgroundPath'];

  @ApiProperty(UserApiProperty.Gender)
  @Expose()
  @IsEnum(UserGender)
  public gender: User['gender'];

  @ApiProperty(UserApiProperty.Role)
  @Expose()
  @IsEnum(UserRole)
  public role: User['role'];

  @ApiProperty(UserApiProperty.RegistrationDate)
  @Transform(transformDate)
  @Expose({ name: 'createdAt' })
  public [UserProp.RegistrationDate]: IUserWithFileIdRdo[UserProp.RegistrationDate];

  @ApiProperty(UserApiProperty.ExistQuestionnaire)
  @Expose()
  public existQuestionnaire: User['existQuestionnaire'];
}
