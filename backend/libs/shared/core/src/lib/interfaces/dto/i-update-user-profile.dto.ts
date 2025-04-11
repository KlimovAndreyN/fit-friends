import { IUpdateUserDto } from './i-update-user.dto';
import { IUpdateQuestionnaireDto } from './i-update-questionnaire.dto';

export type IUpdateUserProfileDto = IUpdateUserDto & IUpdateQuestionnaireDto;
