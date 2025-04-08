import { ICreateBasicQuestionnaireDto } from './i-create-basic-questionnaire.dto';

export const FILES_PROPERTY = 'files';

export interface ICreateQuestionnaireCoachDto
  extends Pick<
    Required<ICreateBasicQuestionnaireDto>,
    'specializations'
    | 'trainingLevel'
    | 'description'
    | 'individualTraining'
  > {
  [FILES_PROPERTY]?: File[];
}
