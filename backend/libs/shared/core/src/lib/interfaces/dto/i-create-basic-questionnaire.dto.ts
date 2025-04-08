import { Questionnaire } from '../questionnaire.interface';

export type ICreateBasicQuestionnaireDto = Pick<
  Questionnaire,
  'specializations'
  | 'trainingLevel'
  | 'duration'
  | 'caloriesLose'
  | 'caloriesWaste'
  | 'description'
  | 'fileIds'
  | 'individualTraining'
>;
