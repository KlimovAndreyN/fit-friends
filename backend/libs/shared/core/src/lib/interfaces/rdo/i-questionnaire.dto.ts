import { IQuestionnaireWithFileIdsRdo } from './i-questionnaire-with-file-ids.dto';

export interface IQuestionnaireRdo extends Omit<IQuestionnaireWithFileIdsRdo, 'fileIds'> {
  filePaths?: string[];
}
