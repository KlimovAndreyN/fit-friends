import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { User } from '../../interfaces/user.interface';
import { TokenPayload } from '../../interfaces/token-payload.interface';
import { IUserRdo } from '../../interfaces/rdo/i-user.rdo';
import { IUpdateUserDto } from '../../interfaces/dto/i-update-user.dto';
import { ICreateUserDto } from '../../interfaces/dto/i-create-user.dto';
import { ICreateUserWithFileIdDto } from '../../interfaces/dto/i-create-user-with-file-id.dto';
import { IUserWithFileIdRdo } from '../../interfaces/rdo/i-user-with-file-id.rdo';
import { MetroStationName } from '../../types/metro-station-name.enum';
import { UserGender } from '../../types/gender.enum';
import { UserRole } from '../../types/role.enum';
import { UserApiProperty } from '../../constants/api-property/user.api-property';
import { UserValidation } from '../../constants/authentication.constant';

//! типизировать через SchemaObjectMetadata не получается
// или import { ApiPropertyOptions } from '@nestjs/swagger';
// или import { SchemaObjectMetadata } from '@nestjs/swagger/dist/interfaces/schema-object-metadata.interface';
// Ошибка - has or is using name 'SchemaObjectCommonMetadata' from external module "fit-friends/backend/node_modules/@nestjs/swagger/dist/interfaces/schema-object-metadata.interface" but cannot be named.ts(4023)

export class UserApiDoc {
  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public id: User['id'];

  @ApiProperty(UserApiProperty.Id)
  @Expose()
  public sub: TokenPayload['sub'];

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

  @ApiProperty(UserApiProperty.About)
  @Expose()
  @IsString()
  @MinLength(UserValidation.About.MinLength)
  @MaxLength(UserValidation.About.MaxLength)
  @IsOptional()
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
  public avatarFile?: ICreateUserDto['avatarFile'];


  @ApiProperty(UserApiProperty.EmptyAvatarFile)
  @Expose()
  @IsOptional()
  @Transform(({ value }) => {
    // из-за 'multipart/form-data' приходит string, а при вторичной транформации, для валидации, уже boolean
    return (typeof value === 'string') ? value === 'true' : value;
  })
  public emptyAvatarFile?: IUpdateUserDto['emptyAvatarFile'];

  @ApiProperty(UserApiProperty.AvatarFilePath)
  @Expose()
  @IsOptional()
  public avatarFilePath?: IUserRdo['avatarFilePath'];

  @ApiProperty(UserApiProperty.MetroStationName)
  @Expose()
  @IsEnum(MetroStationName)
  public metroStationName: User['metroStationName'];

  @ApiProperty(UserApiProperty.BackgroundPath) //! сделать проверку что это путь к файлу или regexp
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
