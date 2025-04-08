import { Questionnaire } from '../questionnaire.interface';

export type IQuestionnaireWithFileIdsRdo = Pick<
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
