import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { UserProp } from '../interfaces/user.interface';
import { ILoginUserDto } from '../interfaces/dto/i-login-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

export class LoginUserDto implements ILoginUserDto {
  @ApiProperty(UserApiProperty.Email)
  @IsEmail({})
  public [UserProp.Email]: string;

  @ApiProperty(UserApiProperty.Password)
  @IsString()
  @MinLength(UserValidation.Password.MinLength)
  @MaxLength(UserValidation.Password.MaxLength)
  public [UserProp.Password]: string;
}
