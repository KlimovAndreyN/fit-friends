import { Questionnaire } from '../questionnaire.interface';

export type IUpdateQuestionnaireDto = Pick<
  Partial<Questionnaire>,
  'specializations'
  | 'trainingLevel'
  | 'readyForTraining'
>;
//! что то нужно дополнтиельное для тренера? | 'description' | 'fileIds' | 'individualTraining' ?
//! если будут файлы менять, то нужно все вынести в IUpdateQuestionnaireWithFileIdsDto, а здесь исключить id файлов и добавить пути к файлам
