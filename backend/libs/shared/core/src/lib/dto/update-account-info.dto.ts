import { IntersectionType, OmitType } from '@nestjs/swagger';

import { IUpdateAccountInfoDto } from '../interfaces/dto/i-update-accoun-info.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpdateQuestionnaireDto } from './update-questionnaire.dto';

export class UpdateAccountInfoDto
  extends IntersectionType(
    UpdateUserDto,
    OmitType(UpdateQuestionnaireDto, ['readyForTraining'])
  )
  implements IUpdateAccountInfoDto { };
