import { Questionnaire } from '../questionnaire.interface';

export type IQuestionnaireWithFileIdsRdo = Pick<
  Questionnaire,
  'specializations' | 'trainingLevel' | 'readyForTraining' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
>;
