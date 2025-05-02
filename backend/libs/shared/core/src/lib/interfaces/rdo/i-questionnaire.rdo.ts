import { IBasicQuestionnaireRdo } from './i-basic-questionnaire.rdo';
import { ICertificateRdo } from './i-certificate.rdo';

export interface IQuestionnaireRdo
  extends Omit<
    IBasicQuestionnaireRdo,
    'userId'
    | 'fileIds'
  > {
  certificates?: ICertificateRdo[];
}
