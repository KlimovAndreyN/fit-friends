import { Questionnaire } from '../questionnaire.interface';

export interface ICreateQuestionnaireDto
  extends Pick<
    Required<Questionnaire>,
    'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
  > {
  specialisations: string[];
}
