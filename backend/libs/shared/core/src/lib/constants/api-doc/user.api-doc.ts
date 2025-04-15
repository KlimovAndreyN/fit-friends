import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import { User } from '../../interfaces/user.interface';
import { TokenPayload } from '../../interfaces/token-payload.interface';
import { IDetailUserRdo } from '../../interfaces/rdo/i-detail-user.rdo';
import { IUpdateUserDto } from '../../interfaces/dto/i-update-user.dto';
import { AVATAR_FILE_PROPERTY, ICreateUserDto } from '../../interfaces/dto/i-create-user.dto';
import { ICreateBasicUserDto } from '../../interfaces/dto/i-create-basic-user.dto';
import { IBasicDetailUserRdo } from '../../interfaces/rdo/i-basic-detail-user.rdo';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';
import { Role } from '../../types/role.enum';
import { transformStringBooleanOrBoolean } from '../../utils/transform';
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
  public password: ICreateBasicUserDto['password'];

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
  public birthday?: ICreateBasicUserDto['birthday'];

  @ApiProperty(UserApiProperty.AvatarFileId)
  @Expose()
  @IsOptional()
  public avatarFileId?: User['avatarFileId'];

  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public [AVATAR_FILE_PROPERTY]?: ICreateUserDto['avatarFile'];

  @ApiProperty(UserApiProperty.EmptyAvatarFile)
  @Expose()
  @IsOptional()
  @Transform(transformStringBooleanOrBoolean) // из-за 'multipart/form-data' приходит string, а при вторичной транформации, для валидации, уже boolean
  public emptyAvatarFile?: IUpdateUserDto['emptyAvatarFile'];

  @ApiProperty(UserApiProperty.AvatarFilePath)
  @Expose()
  @IsOptional()
  public avatarFilePath?: IDetailUserRdo['avatarFilePath'];

  @ApiProperty(UserApiProperty.Location)
  @Expose()
  @IsEnum(Location)
  public location: User['location'];

  @ApiProperty(UserApiProperty.BackgroundPath) //! сделать проверку что это путь к файлу или regexp
  @Expose()
  @IsString()
  @Matches(UserValidation.BackgroundPath.Regexp)
  public backgroundPath: User['backgroundPath'];

  @ApiProperty(UserApiProperty.Gender)
  @Expose()
  @IsEnum(Gender)
  public gender: User['gender'];

  @ApiProperty(UserApiProperty.Role)
  @Expose()
  @IsEnum(Role)
  public role: User['role'];

  @ApiProperty(UserApiProperty.RegistrationDate)
  @Expose({ name: 'createdAt' })
  public registrationDate: IBasicDetailUserRdo['registrationDate'];
}
