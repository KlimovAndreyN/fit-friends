import { Questionnaire } from '../questionnaire.interface';

export type IQuestionnaireWithFileIdsRdo = Pick<
  Questionnaire,
  'specialisations' | 'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
>;
