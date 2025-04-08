import { IBasicDetailUserRdo } from './i-basic-detail-user.rdo';

export type IBasicUserRdo = Pick<
  IBasicDetailUserRdo,
  'id'
  | 'name'
  | 'avatarFileId'
>;
