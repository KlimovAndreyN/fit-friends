import { Questionnaire } from '../questionnaire.interface';

export type ICreateQuestionnaireWithFileIdsDto = Pick<
  Questionnaire,
  'specializations' | 'trainingLevel' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
>;
