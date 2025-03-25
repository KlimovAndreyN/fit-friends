import { Questionnaire } from '../questionnaire.interface';

export type IUpdateQuestionnaireWithFileIdsDto = Pick<Questionnaire, 'specializations' | 'level' | 'readyForTraining'>;
//! что то нужно дополнтиельное для тренера? | 'description' | 'fileIds' | 'individualTraining' ?
