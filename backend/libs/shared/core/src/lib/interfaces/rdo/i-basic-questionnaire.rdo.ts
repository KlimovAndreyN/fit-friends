import { Questionnaire } from '../questionnaire.interface';

export type IBasicQuestionnaireRdo = Pick<
  Required<Questionnaire>, //! возможно у тренера и спортсмена будет свои RDO
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
