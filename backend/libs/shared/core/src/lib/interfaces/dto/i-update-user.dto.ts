import { AVATAR_FILE_PROPERTY, ICreateUserDto } from './i-create-user.dto';
import { IUpdateBasicUserDto } from './i-update-basic-user.dto';

export interface IUpdateUserDto
  extends Omit<IUpdateBasicUserDto, 'avatarFileId'> {
  [AVATAR_FILE_PROPERTY]?: ICreateUserDto['avatarFile'];
  emptyAvatarFile?: boolean;
}
