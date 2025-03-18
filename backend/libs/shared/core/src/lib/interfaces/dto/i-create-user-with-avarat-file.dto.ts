import { UserProp } from '../user.interface';
import { ICreateUserWithFileIdDto } from './i-create-user.dto';

export interface ICreateUserWithAvatarFileDto extends Omit<ICreateUserWithFileIdDto, UserProp.AvatarFileId> {
  [UserProp.AvatarFile]?: File;
}
