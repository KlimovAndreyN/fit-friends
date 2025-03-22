import { Questionnaire } from '../questionnaire.interface';

export type ICreateQuestionnaireDto =
  Pick<
    Required<Questionnaire>,
    'specialisations' | 'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'>

/*
//! Обязательно ли менять тип? так сработает?
export interface ICreateQuestionnaireDto
  extends Pick<
    Required<Questionnaire>,
    'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
  > {
  specialisations: string[];
}
*/
