import { IQuestionnaireRdo } from './i-questionnaire.rdo';
import { IDetailUserRdo } from './i-detail-user.rdo';

//! для списка - Ищут компанию для тренировки
export interface IUserProfileRdo
  extends Pick<
    IDetailUserRdo,
    'id'
    | 'name'
    | 'location'
    | 'avatarFilePath'
  > {
  specializations: IQuestionnaireRdo['specializations'];
}
