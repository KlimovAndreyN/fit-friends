import { UserProp } from '../user.interface';
import { IUserWithFileIdRdo } from './i-user.rdo';

export interface IUserWithAvatarFileRdo extends Omit<IUserWithFileIdRdo, UserProp.AvatarFileId> {
  [UserProp.AvatarSrc]: string;
}
