import { Questionnaire } from '../questionnaire.interface';

export type ICreateQuestionnaireWithFileIdsDto = Pick<
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
