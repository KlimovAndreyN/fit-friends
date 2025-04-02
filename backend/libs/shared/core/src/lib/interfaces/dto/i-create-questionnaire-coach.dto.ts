import { ICreateQuestionnaireWithFileIdsDto } from './i-create-questionnaire-with-file-ids.dto';

export interface ICreateQuestionnaireCoachDto
  extends Pick<
    Required<ICreateQuestionnaireWithFileIdsDto>,
    'specializations' | 'trainingLevel' | 'description' | 'individualTraining'
  > {
  files?: File[];
}
