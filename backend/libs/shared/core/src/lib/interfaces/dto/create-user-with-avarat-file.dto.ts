import { ICreateUserDto } from './create-user.dto';

export interface ICreateUserWithAvatarFileDto extends ICreateUserDto {
  avatarFile?: File;
}
