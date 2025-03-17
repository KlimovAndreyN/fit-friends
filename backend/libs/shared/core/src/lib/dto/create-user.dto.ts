import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { UserProp } from '../interfaces/user.interface';
import { ICreateUserDto } from '../interfaces/dto/i-create-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

export class CreateUserDto implements ICreateUserDto {
  @ApiProperty(UserApiProperty.Name)
  @IsString()
  @MinLength(UserValidation.Name.MinLength)
  @MaxLength(UserValidation.Name.MaxLength)
  public name: string;

  @ApiProperty(UserApiProperty.Email)
  @IsEmail({})
  public email: string;

  @ApiProperty(UserApiProperty.Password)
  @IsString()
  @MinLength(UserValidation.Password.MinLength)
  @MaxLength(UserValidation.Password.MaxLength)
  public password: string;

  //! остальное описать
  @IsOptional()
  birthday?: string;

  @IsOptional()
  [UserProp.AvatarFileId]?: string;

  metroStationName: string;
  backgroundPath: string;
  gender: string;
  role: string;
}
