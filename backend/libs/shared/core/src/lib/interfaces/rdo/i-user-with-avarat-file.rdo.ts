import { UserProp } from '../user.interface';
import { IUserWithFileIdRdo } from './i-user.rdo';

export interface IUserRdo extends Omit<IUserWithFileIdRdo, UserProp.AvatarFileId> {
  [UserProp.AvatarSrc]: string;
}
