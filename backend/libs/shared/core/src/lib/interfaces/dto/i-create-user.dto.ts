import { ICreateBasicUserDto } from './i-create-basic-user.dto';

export const AVATAR_FILE_PROPERTY = 'avatarFile';

export interface ICreateUserDto
  extends Omit<ICreateBasicUserDto, 'avatarFileId'> {
  [AVATAR_FILE_PROPERTY]?: File;
}
