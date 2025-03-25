import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

import { User } from '../interfaces/user.interface';
import { ICreateUserDto } from '../interfaces/dto/i-create-user.dto';
import { ICreateUserWithFileIdDto } from '../interfaces/dto/i-create-user-with-file-id.dto';
import { IUserWithFileIdRdo } from '../interfaces/rdo/i-user-with-file-id.rdo';
import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

//! название и размещение не очень... используется для описания, валидации и трансформации dto и rdo
//! иногда разное описание например дата рождения, в dto и кратное и полное, а rdo только полное
// UserApiDoc
export class BaseUserDto {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public id: User['id'];

  @ApiProperty(UserApiProperty.Name)
  @Expose()
  @IsString()
  @Matches(UserValidation.Name.Regexp)
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

  @ApiProperty()
  //@ApiProperty(UserApiProperty.About)
  @ApiPropertyOptional()
  @Expose()
  public about?: User['about'];

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
  public avatarFile?: ICreateUserDto['avatarFile']

  @ApiProperty(UserApiProperty.MetroStationName)
  @Expose()
  @IsEnum(MetroStationName)
  public metroStationName: User['metroStationName'];

  @ApiProperty(UserApiProperty.BackgroundPath) //! сделать проверку пути
  @Expose()
  @IsString()
  @Matches(UserValidation.BackgroundPath.Regexp)
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
  @Expose({ name: 'createdAt' })
  public registrationDate: IUserWithFileIdRdo['registrationDate'];
}
