import { IBasicQuestionnaireRdo } from './i-basic-questionnaire.rdo';

export interface IQuestionnaireRdo
  extends Omit<
    IBasicQuestionnaireRdo,
    'userId'
    | 'fileIds'
  > {
  filePaths?: string[];
}
