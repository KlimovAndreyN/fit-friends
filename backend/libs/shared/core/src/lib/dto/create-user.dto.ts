import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateUserWithFileIdDto } from './create-user-with-file-id.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { ICreateUserDto } from '../interfaces/dto/i-create-user.dto';

export class CreateUserDto extends OmitType(CreateUserWithFileIdDto, ['avatarFileId']) implements ICreateUserDto {
  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public avatarFile?: ICreateUserDto['avatarFile'];
}
