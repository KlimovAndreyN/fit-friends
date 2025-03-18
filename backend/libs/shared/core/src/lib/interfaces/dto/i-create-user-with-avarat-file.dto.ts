import { UserProp } from '../user.interface';
import { ICreateUserWithFileIdDto } from './i-create-user.dto';

export interface ICreateUserDto extends Omit<ICreateUserWithFileIdDto, UserProp.AvatarFileId> {
  [UserProp.AvatarFile]?: File;
}
