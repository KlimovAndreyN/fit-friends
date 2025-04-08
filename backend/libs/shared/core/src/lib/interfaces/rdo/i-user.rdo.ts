import { IBasicDetailUserRdo } from './i-basic-detail-user.rdo';

export interface IUserRdo
  extends Omit<IBasicDetailUserRdo, 'avatarFileId'> {
  avatarFilePath?: string;
}
