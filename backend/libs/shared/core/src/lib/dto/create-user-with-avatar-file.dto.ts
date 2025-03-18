import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { UserProp } from '../interfaces/user.interface';
import { CreateUserWithFileIdDto } from './create-user-with-file-id.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { ICreateUserDto } from '../interfaces/dto/i-create-user-with-avarat-file.dto';

export class CreateUserDto extends OmitType(CreateUserWithFileIdDto, [UserProp.AvatarFileId]) implements ICreateUserDto {
  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public [UserProp.AvatarFile]?: File;
}
