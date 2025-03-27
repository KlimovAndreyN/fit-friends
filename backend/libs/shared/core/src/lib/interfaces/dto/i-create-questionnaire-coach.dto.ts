import { ICreateQuestionnaireWithFileIdsDto } from './i-create-questionnaire-with-file-ids.dto';

export interface ICreateQuestionnaireCoachDto
  extends Pick<
    Required<ICreateQuestionnaireWithFileIdsDto>,
    'specializations' | 'level' | 'description' | 'individualTraining'
  > {
  files?: File[];
}
