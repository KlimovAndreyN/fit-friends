import { AVATAR_FILE_PROPERTY, ICreateUserDto } from './i-create-user.dto';
import { IUpdateUserWithFileIdDto } from './i-update-user-with-file-id.dto';

export interface IUpdateUserDto
  extends Omit<IUpdateUserWithFileIdDto, 'avatarFileId'> {
  [AVATAR_FILE_PROPERTY]?: ICreateUserDto['avatarFile'];
  emptyAvatarFile?: boolean;
}
