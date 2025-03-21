import { ICreateQuestionnaireDto } from './i-create-questionnaire.dto';

export type ICreateQuestionnaireUserDto = Pick<ICreateQuestionnaireDto, 'level' | 'time' | 'specialisations' | 'caloriesLose' | 'caloriesWaste'>;
