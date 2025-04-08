import { IUserWithFileIdRdo } from './i-user-with-file-id.rdo';

export interface IUserRdo
  extends Omit<IUserWithFileIdRdo, 'avatarFileId'> {
  avatarFilePath?: string;
}
