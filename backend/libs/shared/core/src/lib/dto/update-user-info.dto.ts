import { IntersectionType, OmitType } from '@nestjs/swagger';

import { IUpdateUserInfoDto } from '../interfaces/dto/i-update-user-info.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpdateQuestionnaireDto } from './update-questionnaire.dto';

export class UpdateUserInfoDto
  extends IntersectionType(
    UpdateUserDto,
    OmitType(UpdateQuestionnaireDto, ['readyForTraining'])
  )
  implements IUpdateUserInfoDto { };
