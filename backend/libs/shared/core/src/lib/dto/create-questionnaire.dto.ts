import { PickType } from '@nestjs/swagger';

import { BaseQuestionnaireDto } from './base-questionnaire.dto';
import { ICreateQuestionnaireDto } from '../interfaces/dto/i-create-questionnaire.dto';

export class CreateQuestionnaireDto extends PickType(
  BaseQuestionnaireDto,
  [
    'userRole',
    'specialisations',
    'level',
    'time',
    'caloriesLose',
    'caloriesWaste',
    //! для тренера
    //!'description',
    //!'files',
    //!'individualTraining'
  ]
) implements ICreateQuestionnaireDto { }
