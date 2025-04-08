import { ICreateBasicQuestionnaireDto } from './i-create-basic-questionnaire.dto';

export type ICreateQuestionnaireSportsmanDto = Pick<
  Required<ICreateBasicQuestionnaireDto>,
  'specializations'
  | 'trainingLevel'
  | 'duration'
  | 'caloriesLose'
  | 'caloriesWaste'
>;
