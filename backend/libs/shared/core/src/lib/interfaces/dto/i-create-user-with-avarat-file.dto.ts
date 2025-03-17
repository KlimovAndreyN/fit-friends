import { ICreateUserDto } from './i-create-user.dto';

export interface ICreateUserWithAvatarFileDto extends Omit<ICreateUserDto, 'avatarFileId'> {
  avatarFile?: File;
}
