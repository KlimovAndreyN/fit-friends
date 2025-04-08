import { ICreateUserWithFileIdDto } from './i-create-user-with-file-id.dto';

export const AVATAR_FILE_PROPERTY = 'avatarFile';

export interface ICreateUserDto
  extends Omit<ICreateUserWithFileIdDto, 'avatarFileId'> {
  [AVATAR_FILE_PROPERTY]?: File;
}
