import { PickType } from '@nestjs/swagger';

import { BaseQuestionnaireDto } from './base-questionnaire.dto';
import { ICreateQuestionnaireUserDto } from '../interfaces/dto/i-create-questionnaire-user.dto';

export class CreateQuestionnaireUserDto extends PickType(
  BaseQuestionnaireDto,
  [
    'specialisations',
    'level',
    'time',
    'caloriesLose',
    'caloriesWaste'
  ]
) implements ICreateQuestionnaireUserDto { }
