import { Questionnaire } from '../questionnaire.interface';

export type ICreateQuestionnaireWithFileIdsDto = Pick<
  Questionnaire,
  'specializations' | 'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
>;
