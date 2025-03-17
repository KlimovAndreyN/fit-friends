import { UserProp } from '../user.interface';
import { ICreateUserDto } from './i-create-user.dto';

export interface ICreateUserWithAvatarFileDto extends Omit<ICreateUserDto, UserProp.AvatarFileId> {
  [UserProp.AvatarFile]?: File;
}
