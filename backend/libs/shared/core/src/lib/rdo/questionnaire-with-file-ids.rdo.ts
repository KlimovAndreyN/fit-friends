import { PickType } from '@nestjs/swagger';

import { IQuestionnaireWithFileIdsRdo } from '../interfaces/rdo/i-questionnaire-with-file-ids.dto';
import { BaseQuestionnaireDto } from '../dto/base-questionnaire.dto';

export class QuestionnaireWithFileIdsRdo
  extends PickType(
    BaseQuestionnaireDto,
    [
      'specialisations',
      'level',
      'time',
      'caloriesLose',
      'caloriesWaste',
      'description',
      'fileIds',
      'individualTraining'
    ]
  ) implements IQuestionnaireWithFileIdsRdo { }
