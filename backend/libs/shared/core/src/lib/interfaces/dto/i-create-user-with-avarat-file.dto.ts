import { ICreateUserDto } from './i-create-user.dto';

export interface ICreateUserWithAvatarFileDto extends ICreateUserDto {
  avatarFile?: File;
}
