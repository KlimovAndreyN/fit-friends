import { ICreateQuestionnaireWithFileIdsDto } from './i-create-questionnaire-with-file-ids.dto';

export interface ICreateQuestionnaireDto extends Omit<ICreateQuestionnaireWithFileIdsDto, 'fileIds' | 'userRole'> {
  files?: File[];
}
