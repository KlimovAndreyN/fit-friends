import { IDetailUserRdo } from './i-detail-user.rdo';

export type IUserRdo = Pick<
  IDetailUserRdo,
  'id'
  | 'name'
  | 'avatarFilePath'
>;
