import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IBasicDetailUserRdo } from './i-basic-detail-user.rdo';

export interface IBasicUserProfileRdo
  extends Pick<
    IBasicDetailUserRdo,
    'id'
    | 'name'
    | 'role'
    | 'location'
    | 'avatarFileId'
  > {
  readyForTraining: IQuestionnaireRdo['readyForTraining'];
  specializations: IQuestionnaireRdo['specializations'];
};
