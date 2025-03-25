import { PickType } from '@nestjs/swagger';

import { BaseQuestionnaireDto } from './base-questionnaire.dto';
import { IUpdateQuestionnaireWithFileIdsDto } from '../interfaces/dto/i-update-questionnaire-with-file-ids.dto';

export class UpdateQuestionnaireWithFileIdsDto extends PickType(
  BaseQuestionnaireDto,
  [
    'specializations',
    'level',
    ''
    'caloriesLose',
    'caloriesWaste',
    //! для тренера
    //!'description',
    'fileIds',
    //!'individualTraining'
  ]
) implements IUpdateQuestionnaireWithFileIdsDto { }
