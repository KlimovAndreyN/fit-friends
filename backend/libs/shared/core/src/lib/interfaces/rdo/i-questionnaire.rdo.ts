import { Certificate } from '../certificate.interface';
import { IBasicQuestionnaireRdo } from './i-basic-questionnaire.rdo';

export interface IQuestionnaireRdo
  extends Omit<
    IBasicQuestionnaireRdo,
    'userId'
    | 'fileIds'
  > {
  certificates?: Certificate[];
}
