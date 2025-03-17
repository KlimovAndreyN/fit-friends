import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { UserProp } from '../interfaces/user.interface';
import { CreateUserDto } from './create-user.dto';
import { UserApiProperty } from '../constants/api-property/user.api-property';
import { ICreateUserWithAvatarFileDto } from '../interfaces/dto/i-create-user-with-avarat-file.dto';

export class CreateUserWithAvatarFileDto extends CreateUserDto implements ICreateUserWithAvatarFileDto {
  @ApiProperty(UserApiProperty.AvatarFile)
  @IsOptional()
  public [UserProp.AvatarFile]?: File; //!! наверное еще нужен класс для Swagger, фактически будет в @UploadedFile... avatarFile?: Express.Multer.File
}
