import { IBasicUserProfileRdo } from './i-basic-user-profile.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';

export interface IUserProfileRdo
  extends Pick<
    IBasicUserProfileRdo,
    'id'
    | 'name'
    | 'role'
    | 'location'
    | 'specializations'
  > {
  avatarFilePath?: IDetailUserRdo['avatarFilePath']
}
