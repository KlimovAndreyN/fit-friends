import { PickType } from '@nestjs/swagger';

import { IQuestionnaireWithFileIdsRdo } from '../interfaces/rdo/i-questionnaire-with-file-ids.rdo';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class QuestionnaireWithFileIdsRdo
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
      'fileIds',
      'individualTraining'
    ]
  )
  implements IQuestionnaireWithFileIdsRdo {
}
