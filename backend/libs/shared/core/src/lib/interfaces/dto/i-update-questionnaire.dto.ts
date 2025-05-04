import { Questionnaire } from '../questionnaire.interface';

export type IUpdateQuestionnaireDto = Pick<
  Partial<Questionnaire>,
  'specializations'
  | 'trainingLevel'
  | 'readyForTraining'
>;
