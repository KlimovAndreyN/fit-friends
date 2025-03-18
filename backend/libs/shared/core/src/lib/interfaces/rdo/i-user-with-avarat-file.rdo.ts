import { UserProp } from '../user.interface';
import { IUserRdo } from './i-user.rdo';

export interface IUserWithAvatarFileRdo extends Omit<IUserRdo, UserProp.AvatarFileId> {
  [UserProp.AvatarSrc]: string;
}
