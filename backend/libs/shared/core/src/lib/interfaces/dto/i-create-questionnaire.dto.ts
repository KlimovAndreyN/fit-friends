import { ICreateQuestionnaireWithfIleIdsDto } from './i-create-questionnaire-with-file-ids.dto';

export interface ICreateQuestionnaireDto extends Omit<ICreateQuestionnaireWithfIleIdsDto, 'fileIds'> {
  files?: File[];
}
