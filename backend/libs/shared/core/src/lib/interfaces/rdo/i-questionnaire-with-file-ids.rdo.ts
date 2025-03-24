import { Questionnaire } from '../questionnaire.interface';

export type IQuestionnaireWithFileIdsRdo = Pick<
  Questionnaire,
  'specializations' | 'level' | 'readyForTraining' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
>;
