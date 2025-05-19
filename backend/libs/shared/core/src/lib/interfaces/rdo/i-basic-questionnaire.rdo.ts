import { Questionnaire } from '../questionnaire.interface';

export type IBasicQuestionnaireRdo = Pick<
  Questionnaire,
  'userId'
  | 'specializations'
  | 'trainingLevel'
  | 'readyForTraining'
  | 'duration'
  | 'caloriesLose'
  | 'caloriesWaste'
  | 'description'
  | 'fileIds'
  | 'individualTraining'
>;
