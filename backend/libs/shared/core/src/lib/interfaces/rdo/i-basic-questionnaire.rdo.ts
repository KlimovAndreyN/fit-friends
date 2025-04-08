import { Questionnaire } from '../questionnaire.interface';

export type IBasicQuestionnaireRdo = Pick<
  Questionnaire,
  'specializations'
  | 'trainingLevel'
  | 'readyForTraining'
  | 'duration'
  | 'caloriesLose'
  | 'caloriesWaste'
  | 'description'
  | 'fileIds'
  | 'individualTraining'
>;
