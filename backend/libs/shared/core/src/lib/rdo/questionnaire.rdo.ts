import { PickType } from '@nestjs/swagger';

import { IQuestionnaireRdo } from '../interfaces/rdo/i-questionnaire.rdo';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

//! перепроверить свагер показывает все обязательно
export class QuestionnaireRdo
  extends PickType(
    QuestionnaireApiDoc,
    [
      'specializations',
      'level',
      'readyForTraining',
      'time',
      'caloriesLose',
      'caloriesWaste',
      'description',
      'filePaths',
      'individualTraining'
    ]
  )
  implements IQuestionnaireRdo {
}
