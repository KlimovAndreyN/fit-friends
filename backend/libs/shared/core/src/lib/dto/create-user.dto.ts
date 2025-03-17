import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { ICreateUserDto } from '../interfaces/dto/create-user.dto';
import { MetroStationName } from '../types/metro-station-name.enum';
import { UserGender } from '../types/user-gender.enum';
import { UserRole } from '../types/user-role.enum';
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

  metroStationName: MetroStationName;
  backgroundPath: string;
  gender: UserGender;
  role: UserRole;
}
