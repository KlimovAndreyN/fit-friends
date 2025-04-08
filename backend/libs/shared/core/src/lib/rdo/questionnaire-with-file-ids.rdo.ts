import { PickType } from '@nestjs/swagger';

import { IBasicQuestionnaireRdo } from '../interfaces/rdo/i-basic-questionnaire.rdo';
import { QuestionnaireApiDoc } from '../constants/api-doc/questionnaire.api-doc';

export class QuestionnaireWithFileIdsRdo
  extends PickType(
    QuestionnaireApiDoc,
    [
      'specializations',
      'trainingLevel',
      'readyForTraining',
      'duration',
      'caloriesLose',
      'caloriesWaste',
      'description',
      'fileIds',
      'individualTraining'
    ]
  )
  implements IBasicQuestionnaireRdo { }
