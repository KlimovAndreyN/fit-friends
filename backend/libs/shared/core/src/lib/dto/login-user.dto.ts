import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { ILoginUserDto } from '../interfaces/dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { UserValidation } from '../constants/authentication.constant';

export class LoginUserDto implements ILoginUserDto {
  @ApiProperty(UserApiProperty.Email)
  @IsEmail({})
  public email: string;

  @ApiProperty(UserApiProperty.Password)
  @IsString()
  @MinLength(UserValidation.Password.MinLength)
  @MaxLength(UserValidation.Password.MaxLength)
  public password: string;
}
