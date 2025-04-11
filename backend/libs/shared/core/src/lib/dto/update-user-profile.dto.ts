import { IntersectionType, OmitType } from '@nestjs/swagger';

import { IUpdateUserProfileDto } from '../interfaces/dto/i-update-user-profile.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpdateQuestionnaireDto } from './update-questionnaire.dto';

export class UpdateUserProfileDto
  extends IntersectionType(
    UpdateUserDto,
    OmitType(UpdateQuestionnaireDto, ['readyForTraining'])
  )
  implements IUpdateUserProfileDto { };
