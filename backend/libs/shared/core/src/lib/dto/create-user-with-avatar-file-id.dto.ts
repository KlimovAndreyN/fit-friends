import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';

export class CreateUserWithAvatarFileIdDto extends CreateUserDto {
  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public avatarFileId?: string;
}
