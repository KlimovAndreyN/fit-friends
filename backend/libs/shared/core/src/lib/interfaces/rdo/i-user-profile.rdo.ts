import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';

export interface IUserProfileRdo
  extends Pick<
    IDetailUserRdo,
    'id'
    | 'name'
    | 'role'
    | 'location'
    | 'avatarFilePath'
  > {
  specializations: IQuestionnaireRdo['specializations'];
}
