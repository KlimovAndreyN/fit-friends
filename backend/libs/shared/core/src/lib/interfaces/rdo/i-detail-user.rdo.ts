import { IBasicDetailUserRdo } from './i-basic-detail-user.rdo';

export interface IDetailUserRdo
  extends Omit<IBasicDetailUserRdo, 'avatarFileId'> {
  avatarFilePath?: string;
}
