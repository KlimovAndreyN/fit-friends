import { PickType } from '@nestjs/swagger';

import { BaseQuestionnaireDto } from './base-questionnaire.dto';
import { ICreateQuestionnaireWithFileIdsDto } from '../interfaces/dto/i-create-questionnaire-with-file-ids.dto';

export class CreateQuestionnaireWithFileIdsDto extends PickType(
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
    'fileIds',
    //!'individualTraining'
  ]
) implements ICreateQuestionnaireWithFileIdsDto { }
