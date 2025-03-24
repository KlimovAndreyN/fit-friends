import { IQuestionnaireWithFileIdsRdo } from './i-questionnaire-with-file-ids.rdo';

export interface IQuestionnaireRdo extends Omit<IQuestionnaireWithFileIdsRdo, 'fileIds'> {
  filePaths?: string[];
}
