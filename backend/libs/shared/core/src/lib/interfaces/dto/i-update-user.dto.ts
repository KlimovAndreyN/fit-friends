import { ICreateUserDto } from './i-create-user.dto';
import { IUpdateUserWithFileIdDto } from './i-update-user-with-file-id.dto';

export interface IUpdateUserDto extends Omit<IUpdateUserWithFileIdDto, 'avatarFileId'> {
  avatarFile?: ICreateUserDto['avatarFile'];
  emptyAvatarFile?: boolean;
}
