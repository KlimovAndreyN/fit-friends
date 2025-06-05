import { IUpdateUserDto } from './i-update-user.dto';
import { IUpdateQuestionnaireDto } from './i-update-questionnaire.dto';

export type IUpdateAccountInfoDto = IUpdateUserDto & IUpdateQuestionnaireDto;
