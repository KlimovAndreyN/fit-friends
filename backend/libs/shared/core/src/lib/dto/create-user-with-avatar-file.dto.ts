import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { UserProp } from '../interfaces/user.interface';
import { CreateUserDto } from './create-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { ICreateUserWithAvatarFileDto } from '../interfaces/dto/i-create-user-with-avarat-file.dto';

export class CreateUserWithAvatarFileDto extends OmitType(CreateUserDto, [UserProp.AvatarFileId]) implements ICreateUserWithAvatarFileDto {
  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public [UserProp.AvatarFile]?: File;
}
