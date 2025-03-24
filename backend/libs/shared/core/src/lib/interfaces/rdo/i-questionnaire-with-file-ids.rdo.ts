import { Questionnaire } from '../questionnaire.interface';

export type IQuestionnaireWithFileIdsRdo = Pick<
  Questionnaire,
  'specializations' | 'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
>;
