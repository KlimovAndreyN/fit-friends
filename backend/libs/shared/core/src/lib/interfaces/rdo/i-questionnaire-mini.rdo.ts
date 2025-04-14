import { IBasicQuestionnaireRdo } from './i-basic-questionnaire.rdo';

//! придумать другое название...
export type IQuestionnaireMiniRdo = Pick<
  IBasicQuestionnaireRdo,
  'userId'
  | 'specializations'
>;
